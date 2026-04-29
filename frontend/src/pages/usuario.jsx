import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi, putApi } from "../api/api.js";
import { UserContext } from "../context/UserContext.jsx";
import styles from "./styles.module.css";
import placeHolder from "../../public/icons/place_holder.png";
export default function Usuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const handleReturn = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!userData) {
      setNome("");
      setEmail("");
      setPassword("");
      navigate("/login");
      return;
    }

    setNome(userData.username || "");
    setEmail(userData.email || "");
    setPassword("");
  }, [userData, navigate]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = await getApi("/github/avatars/all");
        setAvatars(Object.values(data || {}));
      } catch (error) {
        console.error("Erro ao buscar avatares:", error);
      }
    };
    fetchAvatars();
  }, []);

  const handleSave = async () => {
    try {
      const response = await putApi(`/login/usuarios/${userData.id}`, {
        username: nome,
        password: password,
        email,
        icon_id: userData.icon_id,
        icon_url: userData.icon_url,
      });

      if (!response || response.error) {
        alert(
          response?.error || "Erro inesperado: resposta indefinida do servidor.",
        );
        return;
      }

      setUserData(response);
      setPassword("");
      alert("Usuario atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar usuario:", error);
      alert("Erro ao atualizar usuario");
    }
  };

  const changeAvatar = (avatar) => {
    setUserData((prev) => ({
      ...prev,
      icon_id: avatar.id,
      icon_url: avatar.icon_url || avatar.icon,
    }));
    setShowAvatarModal(false);
  };

  const toggleAvatarModal = () => {
    setShowAvatarModal((prev) => !prev);
  };

  if (!userData) {
    return null;
  }

  return (
    <>
      <div className={styles.Users}>
        <h2>Usuario</h2>
      </div>
      <div className={styles.UsuarioPage}>
        <div className={styles.User}>
          <input
            type="image"
            src={userData?.icon_url ? `${userData.icon_url}` : placeHolder}
            alt="Avatar"
            className={styles.Avatar}
            onClick={toggleAvatarModal}
          />
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
          <button className={styles.UserButtonSave} onClick={handleSave}>
            Gravar
          </button>
          <button className={styles.UserButtonReturn} onClick={handleReturn}>
            Voltar
          </button>
        </div>

        {showAvatarModal && (
          <div
            className={styles.ModalOverlay}
            onClick={() => setShowAvatarModal(false)}
          >
            <div
              className={styles.ModalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.ModalHeader}>
                <h2>Escolha seu avatar</h2>
                <button
                  type="button"
                  className={styles.CloseButton}
                  onClick={() => setShowAvatarModal(false)}
                >
                  X
                </button>
              </div>

              <div className={styles.AvatarGrid}>
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`${styles.AvatarOption} ${userData.icon_id === avatar.id
                      ? styles.AvatarOptionSelected
                      : ""
                      }`}
                    onClick={() => changeAvatar(avatar)}
                    title={avatar.name}
                  >
                    <img
                      src={avatar.icon_url || avatar.icon}
                      alt={avatar.name}
                      className={styles.AvatarOptionImage}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
