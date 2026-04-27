const API_URL = import.meta.env.VITE_API_URL;

export async function getApi(path) {
  const res = await fetch(`${API_URL}${path}`);
  console.log(res);
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

  console.log(res);
  return res.json();
}

export async function putApi(path, body) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    
    if (!res.ok) {
      return data || { error: "Erro desconhecido do servidor" };
    }

    return data;
  } catch (error) {
    return { error: "Erro de conexão com o servidor" };
  }
}
