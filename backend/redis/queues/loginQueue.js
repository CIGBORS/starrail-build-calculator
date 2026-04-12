import redis from "../redisClient.js";

export async function countUsersLogin(data) {
  await redis.xAdd("login-stream", "*", {
    username: data.username,
    type: data.type,
    timestamp: Date.now().toString(),
  });
}
