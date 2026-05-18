import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const pool = new Pool({
  host: "localhost", // Since we run this natively on Windows
  port: process.env.POSTGRESQL_PORT,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
});

async function run() {
  try {
    const res = await pool.query(`
      SELECT * FROM builds LIMIT 1;
    `);
    console.log(res.rows);
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}

run();
