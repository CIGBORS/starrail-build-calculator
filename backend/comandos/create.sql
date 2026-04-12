CREATE TABLE IF NOT EXISTS sistema_logs (
    id SERIAL PRIMARY KEY,
    acao VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    usuario_afetado VARCHAR(100),
    data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);