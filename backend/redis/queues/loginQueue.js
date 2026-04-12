//aqui fica a fila pro login
//importa o client vulgo redis
import redis from "../redisClient.js";

//função para contar os usuarios logados
export async function countUsersLogin(data) {
  //cria um evento na fila
  //adicionar mensagem na fila login-stream
  await redis.xAdd(
    "login-stream",
    "*",
    //mensagem enviada
    {
      username: data.username,
      type: data.type,
      timestamp: Date.now().toString(),
    },
  );
}
