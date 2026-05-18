import { calculateBuild, saveBuildService, getTopBuildsStatsService } from "../services/calculator.service.js";

export async function calculateCharacterBuild(req, res) {
  try {
    const payload = req.body;
    const result = await calculateBuild(payload);
    res.json(result);
  } catch (error) {
    console.error("Erro ao calcular build:", error);
    res.status(500).json({ error: error.message });
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
