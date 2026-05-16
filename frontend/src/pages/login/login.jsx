import { useState, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../api/api.js";
import { UserContext } from "../../context/UserContext.jsx";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

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

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    const userData = response;
    setUserData(userData);

    navigate("/");
  }

  return (
    <div className="login-page">
      <video autoPlay loop muted playsInline preload="auto" className="background-video">
        <source src="/img/Honkai_Star_Rail.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

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
          <label className="remember-me">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
            />
            <span>Lembrar-me</span>
          </label>
        </div>
      </div>
    </div>
  );
}