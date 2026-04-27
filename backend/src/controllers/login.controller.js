import {
  login as loginService,
  register as registerService,
  registerLog
} from "../services/login.service.js";
import redis from "../../redis/redisClient.js";

export async function registerNewLog(req, res){
  const { action, description, userId } = req.body;

  try {
    if(!action && !description && !userId) {
      return res.status(400).json({ error: "Todos os campos devem estar preenchidos" });
    } else {
      await registerLog(req, res);
      
      return res.status(200).json({ success: "Sucesso no cadastro do log" });
    }
  } catch {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }

  try {
    return await loginService(req, res);
  } catch (error) {
    console.error("Erro no login controller:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function register(req, res) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Nome de usuário, senha e e-mail são obrigatórios" });
  }

  try {
    return await registerService(req, res);
  } catch (error) {
    console.error("Erro no register controller:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function getUsersOnline(req, res) {
  const users = await redis.get("users_logged");

  res.json({
    online: users || 0,
  });
}
