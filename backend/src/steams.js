import redis from "../redis/redisClient.js";

export async function addLoginEvent(data) {
    await redis.xAdd("login-stream", "*", {
        username: data.username,
        type: data.type,
        timestamp: Date.now().toString()
    });
}

export async function addLogEvent(acao, descricao, usuario) {
    await redis.xAdd("log-steam", "*", {
        acao,
        descricao,
        usuario,
        timestamp: Date.now().toString()
    });
}