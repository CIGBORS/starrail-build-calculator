import pool from "../src/config/db.js";

export async function salvarLog(acao, descricao, usuario) {
    try {
        await pool.query(
            "INSERT INTO sistema_logs (acao, descricao, usuario_afetado) VALUES ($1, $2, $3)", 
            [acao, descricao, usuario]
        );
    } catch (error) {
        console.error("Erro ao salvar log no banco:", error);
    }
}
