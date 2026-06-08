import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  max: 20, // maximo de conexoes
  idleTimeoutMillis: 30000, // fecha conexoes inativas apos 30s
  connectionTimeoutMillis: 5000, // tempo maximo aguardando nova conexao (5s)
});

// CRÍTICO PARA ALTA DISPONIBILIDADE: Captura erros de conexões inativas que foram
// derrubadas pelo HAProxy durante um Failover, evitando que o Node.js "crushe" (feche).
pool.on('error', (err, client) => {
  console.error('⚠️ [PostgreSQL Pool] Erro em cliente inativo (Possível Failover ocorrendo):', err.message);
});

export default pool;
