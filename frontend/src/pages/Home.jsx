import HeaderAware from "../components/HeaderAware/HeaderAware";
import LateralBar from "../components/LateralBar/LateralBar";

export default function Home(){

    return (
        <> 
            <div className="home-container">
                <img className="home-banner" src="banners/home-banner.png" /> 

                <div className="home-content">
                    
                    <LateralBar />
                
                    <div className="home-main-content">
                       
                        {/* Uso futuro */}
                    </div>
                </div>

                <HeaderAware /> 
            </div>
        </>
    )
}