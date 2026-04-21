const API_URL = import.meta.env.VITE_API_URL;

export async function getApi(path) {
  const res = await fetch(`${API_URL}${path}`);
  console.log(res);
  return res.json();
}

export async function postApi(path, body) {
  const url = `${API_URL}${path}`;

  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log("Chamando:", url);
  console.log("Body enviado:", body);

  console.log(res);
  return res.json();
}
