import HeaderAware from "../components/HeaderAware/HeaderAware";
import LateralBar from "../components/LateralBar/LateralBar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home(){
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <> 
            <div className="home-container">
                <img className="home-banner" src="banners/home-banner.png" />

                <LateralBar />
                
                <div className="home-main__column">
                    <HeaderAware /> 
                    
                    <div className="home-main-content">
                        <h1> Welcome back {} </h1>
                    </div>
                </div>
            </div>
        </>
    )
}