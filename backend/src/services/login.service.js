import pool from "../config/db.js";
import { salvarLog } from "../../functions/log.js";
import { countUsersLogin } from "../../redis/queues/loginQueue.js";
import * as loginRepository from "../repository/login.repository.js";
import { getAllAvatars } from "./starRail.service.js";
import crypto from 'crypto';
import redis from "../../redis/redisClient.js";

export async function getUsuarios(req, res) {
  try {
    const resultado = await pool.query(
      "SELECT id, username, email, status, data_criacao FROM usuarios ORDER BY id"
    );

    return res.json(resultado.rows);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}

function generateToken(length = 8) {
  return crypto.randomBytes(length).toString('hex');
}

async function criarTabelaSeNaoExistir() {
  try {
    // Colunas base que sempre existiram desde o início
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL DEFAULT '',
          status VARCHAR(100) NOT NULL DEFAULT 'ativo',
          data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          token VARCHAR(255) NOT NULL DEFAULT ''
      );
    `);

    // Colunas adicionadas depois — só rodam se não existirem
    await pool.query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS icon_id VARCHAR(20) DEFAULT '202006'`);
    await pool.query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS icon_url VARCHAR(255) DEFAULT 'icons/place_holder.png'`);
    await pool.query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS token VARCHAR(255) NOT NULL DEFAULT ''`);

    // Tabela de logs
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sistema_logs (
          id SERIAL PRIMARY KEY,
          acao VARCHAR(50) NOT NULL,
          descricao TEXT NOT NULL,
          usuario_afetado VARCHAR(100),
          data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tabelas verificadas/atualizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao verificar tabela de usuários:", error);
  }
}

criarTabelaSeNaoExistir();

export async function registerLog(req, res) {
  const { action, description, userId } = req.body;

  try {
    await salvarLog(action, description, userId);
    return res.status(200).json({ sucess: "Registro salvo com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Erro de contato interno com o servidor" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }

  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1",
      [username]
    );

    if (resultado.rows.length === 0) {
      await redis.xAdd('log-stream', '*', {
        action: 'FALHA_LOGIN',
        description: 'Tentativa de login com usuário inexistente',
        userId: username,
        timestamp: Date.now().toString()
      });

      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const usuarioAchado = resultado.rows[0];

    if (usuarioAchado.password !== password) {
      await redis.xAdd('log-stream', '*', {
        action: 'FALHA_LOGIN',
        description: 'Tentativa de login com senha incorreta',
        userId: username,
        timestamp: Date.now().toString()
      });

      return res.status(401).json({ error: "Senha incorreta!" });
    }

    await redis.xAdd('log-stream', '*', {
      action: 'LOGIN_SUCESSO',
      description: 'Usuário entrou no sistema',
      userId: username,
      timestamp: Date.now().toString()
    });

    await countUsersLogin({
      username,
      type: "login",
    });

    const { password: _, ...usuarioSemSenha } = usuarioAchado;

    const { password: _, ...usuarioSemSenha } = usuarioAchado;
    return res.json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro de conexão com o banco" });
  }
}

export async function register(req, res) {
  const { username, password, email, status } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Nome de usuário, senha e e-mail são obrigatórios" });
  }

  try {
    const token = generateToken();

    await pool.query(
      "INSERT INTO usuarios (username, password, email, status, token) VALUES ($1, $2, $3, $4, $5)",
      [username, password, email, status || "ativo", token]
    );

    await redis.xAdd('log-stream', '*', {
      action: 'CADASTRO_SUCESSO',
      description: `Novo usuário ${email} criado.`,
      userId: username,
      timestamp: Date.now().toString()
    });

    return res.json({ message: "Registro bem-sucedido no Banco de Dados!" });
  } catch (error) {
    if (error.code === "23505") {
      await redis.xAdd('log-stream', '*', {
        action: 'FALHA_CADASTRO',
        description: 'Usuário tentou registrar um nome que já existe.',
        userId: username,
        timestamp: Date.now().toString()
      });
      
      return res
        .status(400)
        .json({ error: "Esse nome de usuário já está em uso!" });
    }
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "Erro de conexão com o banco" });
  }
}

export async function changeUser(req, res) {
  const { id } = req.params;
  const { username, password, email, icon_id, icon_url } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Nome de usuário e e-mail são obrigatórios" });
  }

  try {
    let resultado;

    if (password) {
      resultado = await loginRepository.changeUser(req, res);
    } else {
      resultado = await loginRepository.changeUserWithoutPassword(req, res);
    }

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    await redis.xAdd('log-stream', '*', {
      action: 'ALTERACAO_USUARIO',
      description: 'Dados do usuário atualizados com sucesso',
      userId: username,
      timestamp: Date.now().toString()
    });

    return res.json(resultado.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Esse nome de usuário já está em uso!" });
    }
    console.error("Erro ao atualizar usuário:", error, error.stack);
    return res.status(500).json({ error: "Erro de conexão com o banco", details: error.message });
  }
}

export async function validateSession(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const resultado = await pool.query(
      "SELECT id, username, email, status, icon_id, icon_url, token, logado FROM usuarios WHERE token = $1",
      [token]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Sessão inválida ou expirada" });
    }

    return res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao validar sessão:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}