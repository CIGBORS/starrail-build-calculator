import redis from "../redis/redisClient.js";
import { salvarLog } from "../functions/log.js";

const consumerName = `worker-${Math.random().toString(36).substr(2, 7)}`;

async function setupConsumerGroups() {
  const streams = ["login-stream", "log-stream"];
  for (const stream of streams) {
    try {
      await redis.xGroupCreate(stream, "workers", "0", { MKSTREAM: true });
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
      const results = await redis.xReadGroup("workers", consumerName, [
        { key: "login-stream", id: ">" },
        { key: "log-stream", id: ">" }
      ], {
        COUNT: 1,
        BLOCK: 0  // espera infinita até chegar mensagem
      });

      if (results) {
        for (const stream of results) {
          const streamName = stream.name;
          for (const message of stream.messages) {
            const msgId = message.id;
            const data = message.message;

            try {
              if (streamName === "login-stream") {
                await redis.incr("users_logged");
                console.log(`Login processado: ${data.username}`);
              } else if (streamName === "log-stream") {
                await salvarLog(data.action, data.description, data.userId);
                console.log(`Log salvo: ${data.action}`);
              }
              await redis.xAck(streamName, "workers", msgId);
            } catch (err) {
              console.error(`Erro ${streamName}/${msgId}:`, err);
            }
          }
        }
      }
    } catch (loopError) {
      console.error("Erro no loop:", loopError);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

startWorker();