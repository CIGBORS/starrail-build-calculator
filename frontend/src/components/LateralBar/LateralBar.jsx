import "./LateralBar.css";
import { NavLink } from "react-router-dom";

export default function LateralBar({ userLogged = null }) {
  const userIcon = null;
  // eslint-disable-next-line no-unused-vars
  function getUserIcon() {
    // Função para pegar o ícone do usuário que ele cadastrou
    // Aqui ele deverá mudar a varíavel de userIcon no futuro
    // Esse ferramenta, DEVE trazer o caminho
  }

  return (
    <>
      <div className="lateral-bar">
        {/* Adicionar condições para caso o usuário esteja loggado*/}
        {
            userLogged === null ? 
            ( <img className="lateral-bar__user-icon" src="icons/place_holder.png" /> ) :
            ( <img src={userIcon} />)
        }

        <div className="lateral-bar__primary-icons">
            <div className="primary-icons__icon">
                <NavLink to="/characters" className={({isActive}) => isActive ? "nav-link-active" : ""}>
                    <img className="lateral-bar__icon" src="icons/character-icon.png" />
                </NavLink>
                
                <NavLink to="/relics" className={({isActive}) => isActive ? "nav-link-active" : ""}>
                    <img className="lateral-bar__icon" src="icons/relic-icon.png" />
                </NavLink>

                <NavLink to="/light-cones" className={({isActive}) => isActive ? "nav-link-active" : ""}>
                    <img className="lateral-bar__icon" src="icons/light-cone-icon.png" />
                </NavLink>

                <NavLink to="/saved-builds" className={({isActive}) => isActive ? "nav-link-active" : ""}>
                    <img className="lateral-bar__icon" src="icons/team-icon.png" />
                </NavLink>

                <NavLink to="/build-creators" className={({isActive}) => isActive ? "nav-link-active" : ""}>
                    <img className="lateral-bar__icon" src="icons/inventory-icon.png" />
                </NavLink>

                <NavLink to="/general" className={({isActive}) => isActive ? "nav-link-active" : ""}>
                    <img className="lateral-bar__icon" src="icons/book-icon.png" />
                </NavLink>
            </div>
        </div>

        <div className="lateral-bar__footer">
          <img src="icons/information-icon.png" />
        </div>
      </div>
    </>
  );
}
