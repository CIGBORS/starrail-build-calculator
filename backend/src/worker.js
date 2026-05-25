import redis from "../redis/redisClient.js";
import { salvarLog } from "../functions/log.js";

const consumerName = `worker-${Math.random().toString(36).substring(7)}`;
const MAX_RETRIES = 3;
const DEAD_LETTER_STREAM = "dead-letter-stream";

const handlers = {
    "login-stream": async (data) => {
        await redis.incr("users_logged");
        console.log(`Login processado: ${data.username}`);
    },
    "log-stream": async (data) => {
        await salvarLog(data.action, data.description, data.userId);
        console.log(`Log salvo: ${data.action}`);
    },
    "build-stream": async (data) => {
        const jobId = data.jobId;
        try {
            const payload = JSON.parse(data.payload);
            const { calculateBuild } = await import("./services/calculator.service.js");
            const result = await calculateBuild(payload);
            
            // Save result to Redis (expires in 10 minutes)
            if (jobId) {
                await redis.setEx(`build-result:${jobId}`, 600, JSON.stringify(result));
            }
            console.log(`Build calculada: ${jobId || 'sem id'}`);
        } catch (error) {
            if (jobId) {
                await redis.setEx(`build-error:${jobId}`, 600, error.message);
            }
            throw error;
        }
    },
    "dead-letter-stream": async (data) => {
        console.error(`[DEAD-LETTER] Stream original: ${data.originalStream}`, data);
    }
};

async function setupConsumerGroups() {
    const allStreams = [...new Set([...Object.keys(handlers), DEAD_LETTER_STREAM])];
    for (const stream of allStreams) {
        try {
            await redis.xGroupCreate(stream, "workers", "0", { MKSTREAM: true });
            console.log(`Grupo 'workers' criado para ${stream}`);
        } catch (err) {
            if (!err.message.includes("BUSYGROUP")) throw err;
        }
    }
}

async function startWorker() {
    await setupConsumerGroups();
    console.log(`Worker ${consumerName} aguardando jobs...`);

    while (true) {
        try {
            const streamKeys = Object.keys(handlers).map(key => ({ key, id: '>' }));
            const results = await redis.xReadGroup('workers', consumerName, streamKeys, {
                COUNT: 1,
                BLOCK: 0
            });

            if (results) {
                for (const stream of results) {
                    const streamName = stream.name;
                    for (const message of stream.messages) {
                        const msgId = message.id;
                        const data = message.message;

                        if (!data.retryCount) data.retryCount = '0';

                        try {
                            if (handlers[streamName]) {
                                await handlers[streamName](data);
                            } else {
                                console.warn(`Nenhum handler para stream ${streamName}`);
                            }

                            await redis.xAck(streamName, 'workers', msgId);
                            console.log(`Job ${msgId} concluído com sucesso`);
                        } catch (err) {
                            console.error(`Erro em ${streamName}/${msgId}:`, err);
                            const attempts = parseInt(data.retryCount) + 1;

                            if (attempts <= MAX_RETRIES) {
                                await redis.xAdd(streamName, '*', {
                                    ...data,
                                    retryCount: attempts.toString(),
                                    lastError: err.message
                                });
                                await redis.xAck(streamName, 'workers', msgId);
                                console.log(`Job ${msgId} re-agendado (tentativa ${attempts}/${MAX_RETRIES})`);
                            } else {
                                // Move para dead-letter
                                await redis.xAdd(DEAD_LETTER_STREAM, '*', {
                                    ...data,
                                    originalStream: streamName,
                                    finalError: err.message,
                                    failedAt: new Date().toISOString()
                                });
                                await redis.xAck(streamName, 'workers', msgId);
                                console.log(`Job ${msgId} movido para dead-letter após ${MAX_RETRIES} tentativas`);
                            }
                        }
                    }
                }
            }
        } catch (loopError) {
            console.error('Erro no loop do worker:', loopError);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

startWorker();