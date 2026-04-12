import pool from "../config/db.js";
import { salvarLog } from "../../functions/log.js";

// Essa função roda quando o servidor sobe e já cria a tabela no banco automaticamente caso você não tenha criado!
async function criarTabelaSeNaoExistir() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                status VARCHAR(100) NOT NULL,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Tabela 'usuarios' verificada/criada com sucesso!");
    } catch (error) {
        console.error("Erro ao verificar tabela de usuários:", error);
    }
}
criarTabelaSeNaoExistir();

export async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
    }

    try {
        // Busca o usuário no banco de dados
        const resultado = await pool.query("SELECT * FROM usuarios WHERE username = $1", [username]);

        if (resultado.rows.length === 0) {
            await salvarLog("FALHA_LOGIN", "Tentativa de login com usuário inexistente", username);
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const usuarioAchado = resultado.rows[0];

        // Se a senha estiver incorreta
        if (usuarioAchado.password !== password) {
            await salvarLog("FALHA_LOGIN", "Tentativa de login com senha incorreta", username);
            return res.status(401).json({ error: "Senha incorreta!" });
        }

        await salvarLog("LOGIN_SUCESSO", "Usuário entrou no sistema", username);
        return res.json({ message: "Login bem-sucedido" });
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
        await pool.query(
            "INSERT INTO usuarios (username, password, email, status) VALUES ($1, $2, $3, $4)",
            [username, password, email, status || "ativo"]
        );

        await salvarLog("CADASTRO_SUCESSO", `Um novo usuario com o e-mail \${email} foi criado.`, username);
        return res.json({ message: "Registro bem-sucedido no Banco de Dados!" });
    } catch (error) {
        if (error.code === '23505') {
            await salvarLog("FALHA_CADASTRO", "Usuário tentou registrar um nome que já existe.", username);
            return res.status(400).json({ error: "Esse nome de usuário já está em uso!" });
        }
        console.error("Erro no registro:", error);
        return res.status(500).json({ error: "Erro de conexão com o banco" });
    }
}