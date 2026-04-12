import { useEffect, useState } from "react";
import { getApi, postApi } from "../../api/api";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./CharacterCardList.css";

export default function CharacterCardList({ Filtro, PesquisaFiltro }) {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 21;

  useEffect(() => {
    setPage(1);

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

  if (loading) return <h1 className="character-card-list__h1">Carregando personagens</h1>;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(characters.length / itemsPerPage);
  const visibleCharacters = characters.slice(startIndex, endIndex);

  const goToNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
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
      {totalPages > 1 && (
        <div className="character-card-list__pagination">
          <button className="character-card-list__pagination-button" onClick={goToPreviousPage} disabled={page === 1}>
           ◀
          </button>
          <span>Página {page} de {totalPages}</span>
          <button className="character-card-list__pagination-button" onClick={goToNextPage} disabled={page === totalPages}>
            ▶
          </button>
        </div>
      )}
    </>
  );
}
