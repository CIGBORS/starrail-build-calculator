import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../public/img/Honkai_Star_Rail.jpg";
import { postApi } from "../../api/api.js";

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    setError("");
    setSuccess("");

    if (!user || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const response = await postApi("/login/register", {
      username: user,
      password,
      email,
      status: "ativo"
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    setSuccess(response.message || "Registro concluído com sucesso");
    setTimeout(() => navigate("/login"), 1200);
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login">
        <div className="card">
          <h2>Cadastrar Usuário</h2>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button onClick={handleRegister}>
            Registrar
          </button>
          <button className="register-button" onClick={() => navigate("/login")}>
            Voltar para Login
          </button>
        </div>
      </div>
    </div>
  );
}