import CharacterCardList from "../components/CharacterCardList/CharacterCardList";
import LateralBar from "../components/LateralBar/LateralBar";

export default function Characters(){
    return (
        <> 
            <LateralBar />
            <div className="characters-content">
                <CharacterCardList />
            </div>
        </>
    )
}