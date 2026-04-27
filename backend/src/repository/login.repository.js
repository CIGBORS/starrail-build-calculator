import pool from "../config/db.js";
import { GITHUB_URL } from "../services/starRail.service.js";

function normalizeIconUrl(iconUrl) {
  if (!iconUrl) {
    return null;
  }

  return iconUrl.startsWith("http") ? iconUrl : `${GITHUB_URL}${iconUrl}`;
}

export async function changeUser(req, res) {
  const { id } = req.params;
  const { username, email, password, icon_id, icon_url } = req.body;

  const resultado = await pool.query(
    `UPDATE usuarios
     SET username = $1, email = $2, password = $3, icon_id = $4, icon_url = $5
     WHERE id = $6
     RETURNING id, username, email, status, data_criacao, icon_id, icon_url`,
    [username, email, password, icon_id, normalizeIconUrl(icon_url), id]
  );

  return resultado;
}

export async function changeUserWithoutPassword(req, res) {
  const { id } = req.params;
  const { username, email, icon_id, icon_url } = req.body;

  const resultado = await pool.query(
    `UPDATE usuarios
     SET username = $1, email = $2, icon_id = $3, icon_url = $4
     WHERE id = $5
     RETURNING id, username, email, status, data_criacao, icon_id, icon_url`,
    [username, email, icon_id, normalizeIconUrl(icon_url), id]
  );

  return resultado;
}
