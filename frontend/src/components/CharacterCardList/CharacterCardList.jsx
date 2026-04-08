import { useEffect, useState } from "react";
import { getApi, postApi } from "../../api/api";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./CharacterCardList.css";

export default function CharacterCardList({ Filtro, PesquisaFiltro }) {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await postApi(`/github/characters/all-cards`, {
          name: PesquisaFiltro.name,
          rarity: Filtro.rarity,
          path: Filtro.path,
          element: Filtro.element,
        });
        setCharacters(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [PesquisaFiltro, Filtro]);

  if (loading) return <h1>Carregando personagens</h1>;

  const visibleCharacters = characters.slice(0, 21);

  return (
    <div className="character-card-list__grid">
      {visibleCharacters.map((char, index) => (
        <CharacterCard
          key={index}
          characterName={char.name}
          characterImage={char.preview}
          characterRarity={char.rarity}
          characterElement={char.element}
          characterPath={char.path}
        />
      ))}
    </div>
  );
}
