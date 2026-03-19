import { useEffect, useState } from "react";
import { getApi } from "../api/api";

export default function Characters({ characterId = "1107" }){
    const [character, setCharacter] = useState(null);

    // Adicionado o código para carregar os dados antes da visualização, lan ting me ajudo
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setLoading(true);
                const data = await getApi(`/github/characters/${characterId}`);
                setCharacter(data);
            } finally {
                setLoading(false);
            }
        };
        

        fetchCharacter();
    }, [characterId]);

    if(loading) return <div>Carregando...</div>

    return (
        <>
            <h1>Character</h1>
            <h2>{character.name}</h2>
            <div>
                <img src={character.icon} width="50%" height="50%S"/>
            </div>
            
        </>
    )
}