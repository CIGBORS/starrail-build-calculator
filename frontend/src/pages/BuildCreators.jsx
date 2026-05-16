import { useEffect, useState } from "react";
import { postApi } from "../api/api";
import BtnInputText from "../components/Filters/BtnInputText/BtnInputText";
import BtnDropdown from "../components/Filters/BtnDropdown/BtnDropdown";
import { Stts } from "../../../shared/variables";

import GeneralCard from "../components/CharacterCard/GeneralCard";

import CharacterCardList from "../components/CharacterCardList/CharacterCardList";
import LateralBar from "../components/LateralBar/LateralBar";

import { Card } from "primereact/card";
import RelicsSttsForm from "../components/RelicsSttsForm/RelicsSttsForm";
import StatsCard from "../components/StatsCard/StatsCard";

export default function BuildCreators() {
  const [finalStats, setFinalStats] = useState({
    hp: "{X}", atk: "{X}", def: "{X}", spd: "{X}",
    crit_rate: "{X}", crit_dmg: "{X}", break: "{X}",
    effect_hit: "{X}", effect_res: "{X}", energy: "{X}", heal: "{X}",
    aggro: "{X}",
    dmg_physical: "{X}", dmg_fire: "{X}", dmg_ice: "{X}",
    dmg_lightning: "{X}", dmg_wind: "{X}", dmg_quantum: "{X}",
    dmg_imaginary: "{X}", dmg_elation: "{X}"
  });

  const [lcInfo, setLcInfo] = useState(null);

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
    charImage: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/77/Sticker_PPG_16_March_7th_02.png/revision/latest?cb=20240913030332",
    lcName: [],
    lcImage:
      "https://static.wikia.nocookie.net/houkai-star-rail/images/e/ea/Icon_Light_Cone.png/revision/latest?cb=20240130190656",
    cavernName: [],
    planarName: [],
    cavernImage: ["", "", "", ""],
    planarImage: ["", ""],
  });

  const [Filtro, setFiltro] = useState({
    charName: [],
    lcName: [],
    cavernName: [],
    planarName: [],
  });

  const [PesquisaFiltro, setPesquisaFiltro] = useState({
    charName: "",
    lcName: "",
    cavernName: "",
    planarName: "",
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const charData = await postApi("/github/characters/filters", {});
        const lcData = await postApi("/github/light-cones/filters", {});
        const relicsData = await postApi("/github/relics/filters", {});

        setOpcoesFiltros((prev) => ({
          ...prev,
          charName: charData && charData.name ? charData.name : [],
          lcName: lcData && lcData.name ? lcData.name : [],
          cavernName: relicsData && relicsData.cavern ? relicsData.cavern : [],
          planarName: relicsData && relicsData.planar ? relicsData.planar : [],
        }));
      } catch (error) {
        console.error("Erro ao buscar filtros:", error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const calculate = async () => {
      try {
        const payload = {
          charName: PesquisaFiltro.charName,
          lcName: PesquisaFiltro.lcName,
          cavernName: PesquisaFiltro.cavernName,
          planarName: PesquisaFiltro.planarName,
          relicStats
        };
        const res = await postApi("/github/calculator/build", payload);
        if (res && res.finalStats) {
          setFinalStats(res.finalStats);
        }
        if (res && res.visuals) {
          setOpcoesFiltros(prev => ({
            ...prev,
            charImage: res.visuals.charImage || prev.charImage,
            lcImage: res.visuals.lcImage || prev.lcImage,
            cavernImage: res.visuals.cavernImage && res.visuals.cavernImage.length > 0 ? res.visuals.cavernImage : prev.cavernImage,
            planarImage: res.visuals.planarImage && res.visuals.planarImage.length > 0 ? res.visuals.planarImage : prev.planarImage,
          }));
          if (res.visuals.lcInfo) {
            setLcInfo(res.visuals.lcInfo);
          } else if (!payload.lcName) {
            setLcInfo(null);
          }
        }
      } catch (error) {
        console.error("Erro ao calcular build no backend:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      calculate();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [
    PesquisaFiltro.charName,
    PesquisaFiltro.lcName,
    PesquisaFiltro.cavernName,
    PesquisaFiltro.planarName,
    relicStats
  ]);
  return (
    <>
      <div className="editor-page-wrapper">
      <LateralBar />
        <div className="build-editor-column">
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
                itemName={lcInfo ? lcInfo.name : "Nenhum Cone Selecionado"}
                itemRarity={lcInfo ? String(lcInfo.rarity) : "5"}
                itemImage={OpcoesFiltros.lcImage}
                itemIcon1={lcInfo && lcInfo.path ? lcInfo.path.icon : ""}
              />
            </div>

            <div className="right-side">
              <Card title="Relíquias e Ornamentos" className="relics-container">
                <div className="relics-wrapper">
                  <div className="relics-section">
                    <div className="inputtext-be">
                      <BtnInputText
                        PesquisaFiltro={PesquisaFiltro}
                        setPesquisaFiltro={setPesquisaFiltro}
                        Campo={"cavernName"}
                        Opcoes={OpcoesFiltros.cavernName}
                      />
                    </div>
                    <div className="relics-grid">
                      {relics.slice(0, 4).map((type, index) => (
                        <RelicsSttsForm
                          key={type}
                          type={type}
                          relicData={relicStats[type]}
                          setRelicStats={setRelicStats}
                          image={OpcoesFiltros.cavernImage[index]}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relics-section">
                    <div className="inputtext-be">
                      <BtnInputText
                        PesquisaFiltro={PesquisaFiltro}
                        setPesquisaFiltro={setPesquisaFiltro}
                        Campo={"planarName"}
                        Opcoes={OpcoesFiltros.planarName}
                      />
                    </div>
                    <div className="relics-grid relics-grid--planar">
                      {relics.slice(4, 6).map((type, index) => (
                        <RelicsSttsForm
                          key={type}
                          type={type}
                          relicData={relicStats[type]}
                          setRelicStats={setRelicStats}
                          image={OpcoesFiltros.planarImage[index]}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
