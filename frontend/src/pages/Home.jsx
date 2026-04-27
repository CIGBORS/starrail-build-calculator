import { useContext, useEffect } from "react";
import LateralBar from "../components/LateralBar/LateralBar";
import { UserContext } from "../context/UserContext.jsx";

export default function Home(){
    const { userData } = useContext(UserContext);

    useEffect(() => {
        console.log("Usuario logado no Home:", userData);
    }, [userData]);


    return (
        <> 
            <img className="home-banner" src="banners/home-banner.png" />
            <LateralBar />
        </>
    )
}
