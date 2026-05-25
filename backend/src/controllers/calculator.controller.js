import { calculateBuild, saveBuildService, getSavedBuildsService, deleteBuildService,getTopBuildsStatsService } from "../services/calculator.service.js";
import { enqueueBuildCalculation } from "../../redis/queues/buildQueue.js";
import redis from "../../redis/redisClient.js";

export async function calculateCharacterBuild(req, res) {
  try {
    const payload = req.body;
    const jobId = await enqueueBuildCalculation(payload);
    return res.status(202).json({ jobId, message: "Cálculo enfileirado" });
  } catch (error) {
    console.error("Erro ao enfileirar build:", error);
    return res.status(500).json({ error: error.message });
  }
}

export async function getBuildResult(req, res) {
  try {
    const { jobId } = req.params;
    const result = await redis.get(`build-result:${jobId}`);
    if (result) {
      return res.json({ status: "COMPLETED", data: JSON.parse(result) });
    }
    
    // Check if it failed
    const error = await redis.get(`build-error:${jobId}`);
    if (error) {
      return res.status(500).json({ status: "FAILED", error });
    }

    return res.json({ status: "PROCESSING" });
  } catch (error) {
    console.error("Erro ao buscar resultado da build:", error);
    return res.status(500).json({ error: error.message });
  }
}

export async function saveCharacterBuild(req, res) {
  try {
    const payload = req.body;
    const result = await saveBuildService(payload);
    res.json(result);
  } catch (error) {
    console.error("Erro ao salvar build:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getSavedBuilds(req, res) {
  try {
    const { userId } = req.params;
    const result = await getSavedBuildsService(userId);
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter builds salvas:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteCharacterBuild(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteBuildService(id);
    res.json(result);
  } catch (error) {
    console.error("Erro ao excluir build:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getTopBuildsStats(req, res) {
  try {
    const { charName } = req.body;
    const result = await getTopBuildsStatsService(charName);
    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar top stats:", error);
    res.status(500).json({ error: error.message });
  }
}
