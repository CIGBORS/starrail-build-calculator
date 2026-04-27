import { useContext, useEffect } from "react";
import LateralBar from "../components/LateralBar/LateralBar";
import { UserContext } from "../context/UserContext.jsx";
import HeaderAware from "../components/HeaderAware/HeaderAware.jsx";
import LateralBar from "../components/LateralBar/LateralBar.jsx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import ImageCarousel from "../components/Carousel/ImageCarousel.jsx";

export default function Home(){
    const { userData } = useContext(UserContext);

    return (
        <> 
            <div className="home-container">
                <img className="home-banner" src="banners/home-banner.png" />

                <LateralBar />
                
                <div className="home-main__column">
                    <HeaderAware /> 
                    
                    <div className="home-main-content">
                        { userData ? (
                            <h1 className="home-message"> Bem-vindo {userData.username}! Suas criações estão lhe esperando! </h1>
                        ) : (
                            <h1 className="home-message"> Bem-vindo ao site! Caso deseje ver a suas criações salvas faça <NavLink to="/login">login</NavLink></h1>
                        )}

                        <ImageCarousel />
                    </div>
                </div>
            </div>
        </>
    )
}
