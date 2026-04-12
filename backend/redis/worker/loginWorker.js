import redis from "../../redis/redisClient.js";

async function startWorker() {
  console.log("Login worker iniciado");

  while (true) {
    const response = await redis.xRead(
      [
        {
          key: "login-stream",
          id: "$",
        },
      ],
      {
        BLOCK: 0,
      },
    );

    if (response) {
      const stream = response[0].messages;

      for (const message of stream) {
        const data = message.message;

        console.log("Login recebido:", data);

        // Incrementa contador
        await redis.incr("users_logged");

        console.log("Usuarios logados:", await redis.get("users_logged"));
      }
    }
  }
}

startWorker();
