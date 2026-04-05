import { useEffect, useState } from "react";
import { getApi, postApi } from "../api/api";
import BtnDropDown from "../components/Filtros/BtnDropDown";
import BtnInputText from "../components/Filtros/BtnInputText";
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
      <LateralBar />
      <div className="characters-content">
        <BtnInputText
          PesquisaFiltro={PesquisaFiltro}
          setPesquisaFiltro={setPesquisaFiltro}
          Campo={"name"}
          Opcoes={OpcoesFiltros.name}
        />
        <BtnDropDown
          Opcoes={OpcoesFiltros.rarity}
          Filtro={Filtro}
          setFiltro={setFiltro}
          PesquisaFiltro={PesquisaFiltro}
          setPesquisaFiltro={setPesquisaFiltro}
          Campo={"rarity"}
        />
        <BtnDropDown
          Opcoes={OpcoesFiltros.path}
          Filtro={Filtro}
          setFiltro={setFiltro}
          PesquisaFiltro={PesquisaFiltro}
          setPesquisaFiltro={setPesquisaFiltro}
          Campo={"path"}
        />

        <BtnDropDown
          Opcoes={OpcoesFiltros.element}
          Filtro={Filtro}
          setFiltro={setFiltro}
          PesquisaFiltro={PesquisaFiltro}
          setPesquisaFiltro={setPesquisaFiltro}
          Campo={"element"}
        />
        <CharacterCardList />
      </div>
    </>
  );
}
