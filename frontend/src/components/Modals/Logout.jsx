import "./Logout.css";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";

function ModalLogout({ onClose }){
    const { userData, logout } = useContext(UserContext);

    const handleLogout = () => {
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
                    <h3 className="logout-text"> Tem certeza que deseja deslogar? Para ver as suas criações salvas terá que local novamente. Para cancelar a operação basta fechar essa aba. </h3>
                </div>

                <button className="logout-btn" onClick={handleLogout}> Sim </button>
            </div>
        </div>
    );
};

export default ModalLogout;