import pool from "../config/db.js";

export async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
    }

    try {
        const resultado = await pool.query("SELECT * FROM usuarios WHERE username = $1", [username]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const usuarioAchado = resultado.rows[0];

        if (usuarioAchado.password !== password) {
            return res.status(401).json({ error: "Senha incorreta!" });
        }

        return res.json({ message: "Login bem-sucedido" });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro de conexão com o banco" });
    }
}

export async function register(req, res) {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: "Nome de usuário, senha e e-mail são obrigatórios" });
    }

    try {
        await pool.query("INSERT INTO usuarios (username, password, email) VALUES ($1, $2, $3)", [username, password, email]);

        return res.json({ message: "Registro bem-sucedido no Banco de Dados!" });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: "Esse nome de usuário já está em uso!" });
        }
        console.error("Erro no registro:", error);
        return res.status(500).json({ error: "Erro de conexão com o banco" });
    }
}