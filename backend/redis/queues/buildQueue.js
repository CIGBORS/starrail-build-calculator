import redis from "../redisClient.js";

export async function enqueueBuildCalculation(payload) {
    const jobId = `job-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    await redis.xAdd("build-stream", "*", {
        jobId: jobId,
        payload: JSON.stringify(payload),
        timestamp: Date.now().toString()
    });
    return jobId;
}