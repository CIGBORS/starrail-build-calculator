import { useEffect, useState } from "react";
import { postApi } from "../api/api";
import BtnInputText from "../components/Filters/BtnInputText/BtnInputText.jsx";
import BtnDropdown from "../components/Filters/BtnDropdown/BtnDropdown.jsx";

import CharacterCardList from "../components/CharacterCardList/CharacterCardList";
import LateralBar from "../components/LateralBar/LateralBar";

export default function Characters() {
  const [OpcoesFiltros, setOpcoesFiltros] = useState({
    name: [],
    rarity: [],
    path: [],
    element: [],
  });
  
  // Adicionado o código para carregar os dados antes da visualização, lan ting me ajudo
  const [Filtro, setFiltro] = useState({
    name: [],
    rarity: [],
    path: [],
    element: [],
  });

  const [PesquisaFiltro, setPesquisaFiltro] = useState({
    name: "",
    rarity: "",
    path: "",
    element: "",
  });

  useEffect(() => {
    const fetchCharactersFilters = async () => {
      try {
        const data = await postApi("/github/characters/filters", {
          name: PesquisaFiltro.name,
          rarity: Filtro.rarity,
          path: Filtro.path,
          element: Filtro.element,
        });
        setOpcoesFiltros({
          name: data.name,
          rarity: data.rarity,
          path: data.path,
          element: data.element,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCharactersFilters();
  }, [PesquisaFiltro, Filtro]);

  return (
    <>
      <div className="characters-page">
        <LateralBar />
        <main className="characters-main-content">
          <div className="characters-content__header">
            <BtnInputText
              PesquisaFiltro={PesquisaFiltro}
              setPesquisaFiltro={setPesquisaFiltro}
              Campo={"name"}
              Opcoes={OpcoesFiltros.name}
            />

            <BtnDropdown
              Opcoes={OpcoesFiltros.rarity}
              Filtro={Filtro}
              setFiltro={setFiltro}
              PesquisaFiltro={PesquisaFiltro}
              setPesquisaFiltro={setPesquisaFiltro}
              Campo={"rarity"}
            />

            <BtnDropdown
              Opcoes={OpcoesFiltros.path}
              Filtro={Filtro}
              setFiltro={setFiltro}
              PesquisaFiltro={PesquisaFiltro}
              setPesquisaFiltro={setPesquisaFiltro}
              Campo={"path"}
            />
            
            <BtnDropdown
              Opcoes={OpcoesFiltros.element}
              Filtro={Filtro}
              setFiltro={setFiltro}
              PesquisaFiltro={PesquisaFiltro}
              setPesquisaFiltro={setPesquisaFiltro}
              Campo={"element"}
            />
          </div>

          <CharacterCardList Filtro={Filtro} PesquisaFiltro={PesquisaFiltro} />
        </main>
      </div>
    </>
  );
}