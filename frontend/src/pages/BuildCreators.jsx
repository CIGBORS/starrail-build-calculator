import { useEffect, useState } from "react";
import { getApi, postApi } from "../api/api";
import BtnInputText from "../components/Filters/BtnInputText/BtnInputText";
import BtnDropDown from "../components/Filters/BtnDropdown/BtnDropDown";

import GeneralCard from "../components/CharacterCard/GeneralCard";

import CharacterCardList from "../components/CharacterCardList/CharacterCardList";
import LateralBar from "../components/LateralBar/LateralBar";

import { Card } from "primereact/card";
import RelicsCardTable from "../components/RelicsCardTable/RelicsCardTable";
import StatsCard from "../components/StatsCard/StatsCard";

export default function BuildCreators() {
  const [finalStats, setFinalStats] = useState({
    hp: "{X}",
    atk: "{X}",
    def: "{X}",
    spd: "{X}",
    critRate: "{X}",
    critDmg: "{X}",
    breakEffect: "{X}",
    effectHit: "{X}",
    effectRes: "{X}",
    energyRegen: "{X}",
  });

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
    lcImage: [
      "https://starrail.honeyhunterworld.com/img/item/dazzled-by-a-flowery-world-item_icon_thumbnail_large.webp",
    ],
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
      <div className="build-editor-main">
        <div className="left-side">
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

          <StatsCard stats={finalStats} />

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
            itemImage={OpcoesFiltros.lcImage}
            itemIcon1={""}
          />
        </div>

        <div className="right-side">
          <RelicsCardTable
            sFilterMain={PesquisaFiltro}
            setFilterMain={setPesquisaFiltro}
            mainKey={"atfName"}
            imageKey={"atfImage"}
            mainFilterOptions={OpcoesFiltros}
            relicsUserStatis={relicStats}
            setUserRelicStats={setRelicStats}
            relicstypes={relics}
          />
        </div>
      </div>
    </>
  );
}
