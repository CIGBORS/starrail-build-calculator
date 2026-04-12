import { createClient } from "redis";
//importa o env
import dotenv from "dotenv";
//puxa o redis_url
//redis_url=redis://container:porta
dotenv.config();

//cria client redis
const redis = createClient({
  //aq ele recebe o redis_url
  url: process.env.REDIS_URL,
});

//se o redis der erro
redis.on("error", (err) => console.log("Redis Error:", err));

//conecta com o redis
await redis.connect();

//msg que aparece no debug
console.log("Redis conectado");

//exporta o redis para outros arquivos acessarem
export default redis;
