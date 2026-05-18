import redis from "../redisClient.js";

export async function enqueueBuildCalculation(playload) {
    await redis.xAdd("build=stream", "*", {
        playload: JSON.stringify(playload),
        timestamp: Date.now().toString()
    });
};