import { useEffect, useState } from "react"
import { getApi } from "../../api/api";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./CharacterCardList.css";

export default function CharacterCardList(){
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const data = await getApi(`/github/characters/all-cards`);
                setCharacters(data);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if(loading) return <h1>Carregando personagens</h1>

    return(
        <>
            <CharacterCard 
                characterName={characters[0].name}
                characterImage={characters[0].preview}
                characterRarity={characters[0].rarity}
                characterElement={characters[0].element} 
                characterPath={characters[0].path}
            />
        </>
    )
}