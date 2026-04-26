const API_URL = import.meta.env.VITE_API_URL;

export async function getApi(path) {
  const res = await fetch(`${API_URL}${path}`);

  return res.json();
}

export async function postApi(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
}
