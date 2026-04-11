import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../public/img/Honkai_Star_Rail.jpg";
import { postApi } from "../../api/api.js";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    setError("");

    if (!user || !password) {
      setError("Preencha usuário e senha");
      return;
    }

    const response = await postApi("/login/", {
      username: user,
      password,
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    navigate("/home");
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login">
        <div className="card">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleLogin}>
            Entrar
          </button>
          <button className="register-button" onClick={() => navigate("/registrar")}>
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}