//importa redis
import redis from "../../redis/redisClient.js";

//worker é como um loop infinito
async function startWorker() {
  console.log("Login worker iniciado");
  //worker é executado o tempo todo
  //sempre se comunica com a fila
  while (true) {
    //recebe a fila, lendo seus eventos
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

    //quando tiver login
    if (response) {
      //redis pode mandar varias mensagens
      const stream = response[0].messages;

      //processa cada login
      for (const message of stream) {
        //pega os dados
        //no caso do login seria
        //  username:--
        //  type: login
        const data = message.message;

        console.log("Login recebido:", data);

        // Incrementa contador
        await redis.incr("users_logged");

        //log final que mostra no console
        console.log("Usuarios logados:", await redis.get("users_logged"));
      }
    }
  }
}
//inicia o worker
startWorker();
