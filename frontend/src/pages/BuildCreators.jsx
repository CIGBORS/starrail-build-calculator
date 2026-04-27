import { useEffect, useState } from "react";
import { getApi, postApi } from "../api/api";
import BtnInputText from "../components/Filters/BtnInputText/BtnInputText";
import BtnDropDown from "../components/Filters/BtnDropdown/BtnDropDown";
import { Stts } from "../../../shared/variables";

import GeneralCard from "../components/CharacterCard/GeneralCard";

import CharacterCardList from "../components/CharacterCardList/CharacterCardList";
import LateralBar from "../components/LateralBar/LateralBar";

import { Card } from "primereact/card";
import RelicsSttsForm from "../components/RelicsSttsForm/RelicsSttsForm";
import StatsCard from "../components/StatsCard/StatsCard";
import { applyPassiveConversions } from "../utils/characterPassives";

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

  const [charBaseStats, setCharBaseStats] = useState(null);
  const [lcBaseStats, setLcBaseStats] = useState(null);
  const [lcInfo, setLcInfo] = useState(null);

  const [cavernData, setCavernData] = useState(null);
  const [planarData, setPlanarData] = useState(null);

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
    charImage: "https://upload.wikimedia.org/wikipedia/en/8/86/Firefly_HSR.png",
    lcName: [],
    lcImage:
      "https://starrail.honeyhunterworld.com/img/item/dazzled-by-a-flowery-world-item_icon_thumbnail_large.webp",
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
    const fetchCharacterData = async () => {
      if (PesquisaFiltro.charName) {
        try {
          // Utiliza a rota all-cards para buscar o card do personagem e pegar a imagem preview
          const data = await postApi("/github/characters/all-cards", {
            name: PesquisaFiltro.charName,
          });
          if (data && data.length > 0) {
            setOpcoesFiltros((prev) => ({
              ...prev,
              charImage: data[0].preview,
            }));
            setCharBaseStats({
              ...data[0].stats,
              trace_stats: data[0].trace_stats,
              charId: data[0].id,
            });
            // Atualiza também o Filtro.charName para consistência
            setFiltro((prev) => ({
              ...prev,
              charName: PesquisaFiltro.charName,
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar dados do personagem:", error);
        }
      }
    };

    // Só busca se for um nome que existe na lista (opcional, mas evita requests desnecessários)
    if (OpcoesFiltros.charName.includes(PesquisaFiltro.charName)) {
      fetchCharacterData();
    }
  }, [PesquisaFiltro.charName, OpcoesFiltros.charName]);

  useEffect(() => {
    const fetchLCData = async () => {
      if (PesquisaFiltro.lcName) {
        try {
          const data = await postApi("/github/light-cones/all-cards", {
            name: PesquisaFiltro.lcName,
          });
          if (data && data.length > 0) {
            setOpcoesFiltros((prev) => ({
              ...prev,
              lcImage: data[0].portrait || data[0].preview || data[0].icon,
            }));
            setLcInfo(data[0]);
            setLcBaseStats(data[0].stats);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do Cone de Luz:", error);
        }
      }
    };

    if (OpcoesFiltros.lcName.some(lc => lc === PesquisaFiltro.lcName || lc.name === PesquisaFiltro.lcName)) {
      fetchLCData();
    }
  }, [PesquisaFiltro.lcName, OpcoesFiltros.lcName]);

  useEffect(() => {
    const fetchCavernData = async () => {
      if (PesquisaFiltro.cavernName) {
        try {
          const data = await postApi("/github/relics/all-cards", {
            name: PesquisaFiltro.cavernName,
          });
          if (data && data.length > 0) {
            setOpcoesFiltros((prev) => ({
              ...prev,
              cavernImage: data[0].icons.slice(0, 4) || ["", "", "", ""],
            }));
            setCavernData(data[0]);
          }
        } catch (error) {
          console.error("Erro ao buscar dados das Relíquias:", error);
        }
      }
    };

    if (OpcoesFiltros.cavernName.includes(PesquisaFiltro.cavernName)) {
      fetchCavernData();
    }
  }, [PesquisaFiltro.cavernName, OpcoesFiltros.cavernName]);

  useEffect(() => {
    const fetchPlanarData = async () => {
      if (PesquisaFiltro.planarName) {
        try {
          const data = await postApi("/github/relics/all-cards", {
            name: PesquisaFiltro.planarName,
          });
          if (data && data.length > 0) {
            setOpcoesFiltros((prev) => ({
              ...prev,
              planarImage: data[0].icons.slice(0, 2) || ["", ""],
            }));
            setPlanarData(data[0]);
          }
        } catch (error) {
          console.error("Erro ao buscar dados dos Ornamentos Planos:", error);
        }
      }
    };

    if (OpcoesFiltros.planarName.includes(PesquisaFiltro.planarName)) {
      fetchPlanarData();
    }
  }, [PesquisaFiltro.planarName, OpcoesFiltros.planarName]);

  useEffect(() => {
    if (!charBaseStats) {
      setFinalStats({
        hp: "{X}", atk: "{X}", def: "{X}", spd: "{X}",
        crit_rate: "{X}", crit_dmg: "{X}", break: "{X}",
        effect_hit: "{X}", effect_res: "{X}", energy: "{X}", heal: "{X}",
        aggro: "{X}",
        dmg_physical: "{X}", dmg_fire: "{X}", dmg_ice: "{X}",
        dmg_lightning: "{X}", dmg_wind: "{X}", dmg_quantum: "{X}",
        dmg_imaginary: "{X}", dmg_elation: "{X}"
      });
      return;
    }

    const baseHp = charBaseStats.hp + (lcBaseStats ? lcBaseStats.hp : 0);
    const baseAtk = charBaseStats.atk + (lcBaseStats ? lcBaseStats.atk : 0);
    const baseDef = charBaseStats.def + (lcBaseStats ? lcBaseStats.def : 0);
    const baseSpd = charBaseStats.spd;
    const baseCritRate = charBaseStats.crit_rate;
    const baseCritDmg = charBaseStats.crit_dmg;

    let totals = {
      flat: { hp: 0, atk: 0, def: 0, spd: 0 },
      percent: {
        hp: 0, atk: 0, def: 0, spd: 0,
        crit_rate: 0, crit_dmg: 0, break: 0,
        effect_hit: 0, effect_res: 0, energy: 0, heal: 0,
        all_dmg: 0, dmg_physical: 0, dmg_fire: 0, dmg_ice: 0,
        dmg_lightning: 0, dmg_wind: 0, dmg_quantum: 0, dmg_imaginary: 0, dmg_elation: 0
      }
    };

    Object.values(relicStats).forEach(relic => {
      const statsToProcess = [relic.main, ...relic.subs];
      statsToProcess.forEach(s => {
        if (!s.stat || !s.value) return;
        const statInfo = Stts[s.stat];
        if (!statInfo) return;

        if (statInfo.percent) {
          totals.percent[statInfo.field] += Number(s.value);
        } else {
          totals.flat[statInfo.field] += Number(s.value);
        }
      });
    });

    const propMap = {
      HPAddedRatio: { field: "hp", percent: true },
      AttackAddedRatio: { field: "atk", percent: true },
      DefenceAddedRatio: { field: "def", percent: true },
      SpeedDelta: { field: "spd", percent: false },
      CriticalChanceBase: { field: "crit_rate", percent: true },
      CriticalDamageBase: { field: "crit_dmg", percent: true },
      BreakDamageAddedRatioBase: { field: "break", percent: true },
      StatusProbabilityBase: { field: "effect_hit", percent: true },
      StatusResistanceBase: { field: "effect_res", percent: true },
      SPRatioBase: { field: "energy", percent: true },
      HealRatioBase: { field: "heal", percent: true },
      AllDamageTypeAddedRatio: { field: "all_dmg", percent: true },
      PhysicalAddedRatio: { field: "dmg_physical", percent: true },
      FireAddedRatio: { field: "dmg_fire", percent: true },
      IceAddedRatio: { field: "dmg_ice", percent: true },
      LightningAddedRatio: { field: "dmg_lightning", percent: true },
      ThunderAddedRatio: { field: "dmg_lightning", percent: true },
      WindAddedRatio: { field: "dmg_wind", percent: true },
      QuantumAddedRatio: { field: "dmg_quantum", percent: true },
      ImaginaryAddedRatio: { field: "dmg_imaginary", percent: true },
      ElationAddedRatio: { field: "dmg_elation", percent: true },
    };

    if (lcInfo && lcInfo.properties) {
      lcInfo.properties.forEach((prop) => {
        const mapped = propMap[prop.type];
        if (mapped) {
          const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
          if (mapped.percent) {
            totals.percent[mapped.field] += valToAdd;
          } else {
            totals.flat[mapped.field] += valToAdd;
          }
        }
      });
    }

    if (charBaseStats.trace_stats) {
      charBaseStats.trace_stats.forEach((prop) => {
        const mapped = propMap[prop.type];
        if (mapped) {
          const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
          if (mapped.percent) {
            totals.percent[mapped.field] += valToAdd;
          } else {
            totals.flat[mapped.field] += valToAdd;
          }
        }
      });
    }

    if (cavernData && cavernData.properties) {
      cavernData.properties.forEach((propList) => {
        propList.forEach((prop) => {
          const mapped = propMap[prop.type];
          if (mapped) {
            const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
            if (mapped.percent) {
              totals.percent[mapped.field] += valToAdd;
            } else {
              totals.flat[mapped.field] += valToAdd;
            }
          }
        });
      });
    }

    if (planarData && planarData.properties) {
      planarData.properties.forEach((propList) => {
        propList.forEach((prop) => {
          const mapped = propMap[prop.type];
          if (mapped) {
            const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
            if (mapped.percent) {
              totals.percent[mapped.field] += valToAdd;
            } else {
              totals.flat[mapped.field] += valToAdd;
            }
          }
        });
      });
    }

    // Calcula os stats finais como números puros (antes do toFixed)
    // para que applyPassiveConversions possa operar com precisão
    const rawFinal = {
      hp: Math.floor(baseHp * (1 + totals.percent.hp / 100) + totals.flat.hp),
      atk: Math.floor(baseAtk * (1 + totals.percent.atk / 100) + totals.flat.atk),
      def: Math.floor(baseDef * (1 + totals.percent.def / 100) + totals.flat.def),
      spd: baseSpd * (1 + totals.percent.spd / 100) + totals.flat.spd,
      crit_rate: baseCritRate * 100 + totals.percent.crit_rate,
      crit_dmg: baseCritDmg * 100 + totals.percent.crit_dmg,
      break: totals.percent.break,
      effect_hit: totals.percent.effect_hit,
      effect_res: totals.percent.effect_res,
      energy: 100 + totals.percent.energy,
      heal: totals.percent.heal,
      aggro: charBaseStats.taunt || 0,
      dmg_physical: totals.percent.dmg_physical + totals.percent.all_dmg,
      dmg_fire: totals.percent.dmg_fire + totals.percent.all_dmg,
      dmg_ice: totals.percent.dmg_ice + totals.percent.all_dmg,
      dmg_lightning: totals.percent.dmg_lightning + totals.percent.all_dmg,
      dmg_wind: totals.percent.dmg_wind + totals.percent.all_dmg,
      dmg_quantum: totals.percent.dmg_quantum + totals.percent.all_dmg,
      dmg_imaginary: totals.percent.dmg_imaginary + totals.percent.all_dmg,
      dmg_elation: totals.percent.dmg_elation,
    };

    // Aplica as passivas de conversão de status do personagem (ex: ATK -> Break da Vaga-lume)
    const withPassives = applyPassiveConversions(rawFinal, charBaseStats.charId);

    // Formata os valores finais para exibição
    const final = {
      hp: withPassives.hp,
      atk: withPassives.atk,
      def: withPassives.def,
      spd: withPassives.spd.toFixed(1),
      crit_rate: withPassives.crit_rate.toFixed(1),
      crit_dmg: withPassives.crit_dmg.toFixed(1),
      break: withPassives.break.toFixed(1),
      effect_hit: withPassives.effect_hit.toFixed(1),
      effect_res: withPassives.effect_res.toFixed(1),
      energy: withPassives.energy.toFixed(1),
      heal: withPassives.heal.toFixed(1),
      aggro: withPassives.aggro,
      dmg_physical: withPassives.dmg_physical.toFixed(1),
      dmg_fire: withPassives.dmg_fire.toFixed(1),
      dmg_ice: withPassives.dmg_ice.toFixed(1),
      dmg_lightning: withPassives.dmg_lightning.toFixed(1),
      dmg_wind: withPassives.dmg_wind.toFixed(1),
      dmg_quantum: withPassives.dmg_quantum.toFixed(1),
      dmg_imaginary: withPassives.dmg_imaginary.toFixed(1),
      dmg_elation: withPassives.dmg_elation.toFixed(1),
    };

    setFinalStats(final);
  }, [charBaseStats, lcBaseStats, lcInfo, cavernData, planarData, relicStats]);
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
    </>
  );
}
