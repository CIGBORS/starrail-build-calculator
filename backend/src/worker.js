import redis from "../redis/redisClient";
import { salvarLog } from "../functions/log";

const consumerName = `worker-${Math.random().toString(36).substring(7)}`;

async function setupConsumerGroups(){
    const streams = ["login-stream", "log-stream"];

    for(const stream of streams){
        try {
            await redis.xGroupCreate(stream, "workers", "0", { MKSTREAM: true});

            console.log(`Grupo 'workers' criado para ${stream}`);
        } catch (err) {
            if(err.message.includes("BUSYGROUP")){

            } else {
                throw err;
            }
        }
    }
}

async function startWorker() {
  await setupConsumerGroups();
  console.log(`Worker ${consumerName} aguardando jobs...`);

  while (true) {
    try {
      const results = await redis.xReadGroup('workers', consumerName, [
        { key: 'login-stream', id: '>' },
        { key: 'log-stream', id: '>' }
      ], {
        COUNT: 1,
        BLOCK: 5000
      });

      if (results) {
        for (const stream of results) {
          const streamName = stream.name;
          for (const message of stream.messages) {
            const msgId = message.id;
            const data = message.message;

            try {
              if (streamName === 'login-stream') {
                await redis.incr('users_logged');
                console.log(`Login processado: ${data.username}`);
              } else if (streamName === 'log-stream') {
                await salvarLog(data.action, data.description, data.userId);
                console.log(`Log salvo: ${data.action}`);
              }

              // Confirma que a mensagem foi processada
              await redis.xAck(streamName, 'workers', msgId);
            } catch (err) {
              console.error(`Erro ao processar ${streamName}/${msgId}:`, err);
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