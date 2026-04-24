import { useEffect, useState } from "react";
import { getApi, postApi } from "../api/api";
import BtnInputText from "../components/Filters/BtnInputText/BtnInputText";
import BtnDropDown from "../components/Filters/BtnDropdown/BtnDropDown";

import GeneralCard from "../components/CharacterCard/GeneralCard";

import CharacterCardList from "../components/CharacterCardList/CharacterCardList";
import LateralBar from "../components/LateralBar/LateralBar";

import { Card } from "primereact/card";
import RelicsCardTable from "../components/RelicsCardTable/RelicsCardTable";

export default function BuildCreators() {
  const [relicStats, setRelicStats] = useState({
    head: {
      main: { stat: null, value: null },
      subs: [
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
      ],
    },
    hands: {
      main: { stat: null, value: null },
      subs: [
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
      ],
    },
    body: {
      main: { stat: null, value: null },
      subs: [
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
      ],
    },
    boots: {
      main: { stat: null, value: null },
      subs: [
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
      ],
    },
    sphere: {
      main: { stat: null, value: null },
      subs: [
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
      ],
    },
    rope: {
      main: { stat: null, value: null },
      subs: [
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
        { stat: null, value: null },
      ],
    },
  });

  const relics = ["head", "hands", "body", "boots", "sphere", "rope"];

  const [OpcoesFiltros, setOpcoesFiltros] = useState({
    charName: [],
    charImage: [
      "https://upload.wikimedia.org/wikipedia/en/8/86/Firefly_HSR.png",
    ],
    lcName: [],
    lcImage: ["https://pbs.twimg.com/media/G98zf9LXsAAu3hi.jpg"],
    atfName: [],
    atfImage: [],
  });
  // Adicionado o código para carregar os dados antes da visualização, lan ting me ajudo
  const [Filtro, setFiltro] = useState({
    charName: [],
    lcName: [],
    atfName: [],
  });

  const [PesquisaFiltro, setPesquisaFiltro] = useState({
    charName: "",
    lcName: "",
    atfName: "",
  });

  useEffect(() => {}, [PesquisaFiltro, Filtro]);

  return (
    <>
      <LateralBar />
      <div className="build-editor">
        <div className="inputtext-be">
          <BtnInputText
            PesquisaFiltro={PesquisaFiltro}
            setPesquisaFiltro={setPesquisaFiltro}
            Campo={"charName"}
            Opcoes={OpcoesFiltros.charName}
          />
        </div>
        <div className="build-editor_content">
          <div className="character-preview">
            <img src={OpcoesFiltros.charImage} alt={Filtro.charName} />
          </div>
        </div>

        <div className="inputtext-be">
          <BtnInputText
            PesquisaFiltro={PesquisaFiltro}
            setPesquisaFiltro={setPesquisaFiltro}
            Campo={"lcName"}
            Opcoes={OpcoesFiltros.lcName}
          />
        </div>
        <GeneralCard
          itemName={"Firosfly"}
          itemRarity={"5"}
          itemImage={OpcoesFiltros.lcName}
          itemIcon1={""}
        />

        {/*
          <BtnDropDown
            Opcoes={OpcoesFiltros.rarity}
            Filtro={Filtro}
            setFiltro={setFiltro}
            PesquisaFiltro={PesquisaFiltro}
            setPesquisaFiltro={setPesquisaFiltro}
            Campo={"rarity"}
          />*/}
      </div>

      <RelicsCardTable
        sFilterMain={PesquisaFiltro}
        setFilterMain={setPesquisaFiltro}
        mainKey={"atfName"}
        mainFilterOptions={OpcoesFiltros}
        relicsUserStatis={relicStats}
        setUserRelicStats={setRelicStats}
        relicstypes={relics}
      />
    </>
  );
}
