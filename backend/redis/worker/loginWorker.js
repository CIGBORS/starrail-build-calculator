import redis from "../../redis/redisClient.js";

async function startWorker() {
  console.log("Login worker iniciado");

  while (true) {
    const response = await redis.xRead(
      [
        //key: fila
        //id: ultimos eventos
        //observa e reage quando surgir um novo evento na fila
        {
          key: "login-stream",
          id: "$",
        },
      ],
      {
        //block  0 significa que ele espera uma resposta infinitamente
        //fica esperando o login acontecer para reagir
        BLOCK: 0,
      },
    );


    if (response) {
      const stream = response[0].messages;

      for (const message of stream) {
        const data = message.message;

        console.log("Login recebido:", data);

        await redis.incr("users_logged");

        console.log("Usuarios logados:", await redis.get("users_logged"));
      }
    }
  }
}

startWorker();
