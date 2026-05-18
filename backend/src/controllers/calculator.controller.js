import { calculateBuild } from "../services/calculator.service.js";

export async function calculateCharacterBuild(req, res) {
  try {
    const payload = req.body;
    const result = await calculateBuild(payload);
    return res.json(result);
  } catch (error) {
    console.error("Erro ao calcular build:", error);
    return res.status(500).json({ error: error.message });
  }
}