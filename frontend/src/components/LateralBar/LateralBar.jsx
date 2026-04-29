import "./LateralBar.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ModalLogout from "../Modals/Logout";
import placeHolder from "../../../public/icons/place_holder.png";

export default function LateralBar() {
  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line no-unused-vars
  function getUserIcon() {
    // Função para pegar o ícone do usuário que ele cadastrou
    // Aqui ele deverá mudar a varíavel de userIcon no futuro
    // Esse ferramenta, DEVE trazer o caminho
  }

  const { userData } = useContext(UserContext);
  console.log(userData)
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="lateral-bar">
        <NavLink
          to="/usuario">
          <img
            className="lateral-bar__user-icon"
            src={userData?.icon_url ? `${userData.icon_url}` : placeHolder}
          />
        </NavLink>

        <div className="lateral-bar__primary-icons">
          <div className="primary-icons__icon">
            <NavLink
              to="/characters"
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              <img
                className="lateral-bar__icon"
                src="icons/character-icon.png"
              />
            </NavLink>

            {/* <NavLink
              to="/relics"
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >*/}
            <img
              className="lateral-bar__icon"
              src="icons/relic-icon.png"
              onClick={() => alert("Em desenvolvimento")}
            />
            {/*  </NavLink>*/}
            {/*
            <NavLink
              to="/light-cones"
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >*/}
            <img
              className="lateral-bar__icon"
              src="icons/light-cone-icon.png"
              onClick={() => alert("Em desenvolvimento")}
            />
            {/*</NavLink>*/}

            {/*<NavLink
              to="/saved-builds"
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >*/}
            <img
              className="lateral-bar__icon"
              src="icons/team-icon.png"
              onClick={() => alert("Em desenvolvimento")}
            />
            {/*</NavLink>*/}

            <NavLink
              to="/build-creators"
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              <img
                className="lateral-bar__icon"
                src="icons/inventory-icon.png"
              />
            </NavLink>

            {/* <NavLink
              to="/general"
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >*/}
            <img
              className="lateral-bar__icon"
              src="icons/book-icon.png"
              onClick={() => alert("Em desenvolvimento")}
            />
            {/*</NavLink>*/}
          </div>
        </div>

        <div className="lateral-bar__footer">
          {
            !userData ? (
              ""
            ) : (
              <img
                className="lateral-bar__icon"
                onClick={handleOpenModal}
                src="icons/exit-icon.png" alt="Encerrar Sessão"
              />
            )
          }

          <img className="lateral-bar__icon" src="icons/information-icon.png" alt="Informações sobre o site" />
        </div>
      </div>

      {
        showModal && (
          <ModalLogout onClose={handleCloseModal} />
        )
      }
    </>
  );
}