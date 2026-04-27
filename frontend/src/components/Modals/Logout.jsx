import "./Logout.css";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../../context/UserContext.jsx";
import { postApi } from "../../api/api.js";

function ModalLogout({ onClose }){
    const { userData, logout } = useContext(UserContext);

    async function handleLog() {
        await postApi("/login/log", {
            action: "LOGOUT_SUCCEEDED",
            description: "The user in question tried to logout and it was succeeded.",
            userId: userData.id
        });
    }
    
    const handleLogout = async () => {
        await handleLog();
        logout();
        onClose();
    }

    return (
        <div className="logout-overlay">
            <div className="logout-content">
                <div className="logout-header">
                    <IoClose size={20} color="white" onClick={onClose} />
                </div>

                <div className="logout-body">
                    <h1 className="logout-username">Olá {userData.username}</h1>
                    <h3 className="logout-text"> Tem certeza que deseja deslogar? Para ver as suas criações salvas terá que logar novamente. Para cancelar a operação basta fechar essa aba. </h3>
                </div>

                <button className="logout-btn" onClick={handleLogout}> Sim </button>
            </div>
        </div>
    );
};

export default ModalLogout;