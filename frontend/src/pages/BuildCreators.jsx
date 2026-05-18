import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { postApi } from "../api/api";
import BtnInputText from "../components/Filters/BtnInputText/BtnInputText";
import BtnDropdown from "../components/Filters/BtnDropdown/BtnDropdown";
import { Stts } from "../../../shared/variables";

import GeneralCard from "../components/CharacterCard/GeneralCard";

import CharacterCardList from "../components/CharacterCardList/CharacterCardList";
import LateralBar from "../components/LateralBar/LateralBar";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import RelicsSttsForm from "../components/RelicsSttsForm/RelicsSttsForm";
import StatsCard from "../components/StatsCard/StatsCard";
import GenericChart from "../components/Charts/GenericChart/GenericChart";

export default function BuildCreators() {
  const location = useLocation();
  const editBuildIdRef = useRef(location.state?.editBuild?.id || null);
  const [editBuildId, setEditBuildId] = useState(null);
  const [finalStats, setFinalStats] = useState({
    hp: "{X}", atk: "{X}", def: "{X}", spd: "{X}",
    crit_rate: "{X}", crit_dmg: "{X}", break: "{X}",
    effect_hit: "{X}", effect_res: "{X}", energy: "{X}", heal: "{X}",
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
    charPath: null,
    lcName: [],
    lcImage:
      "https://static.wikia.nocookie.net/houkai-star-rail/images/e/ea/Icon_Light_Cone.png/revision/latest?cb=20240130190656",
    cavernName: [],
    planarName: [],
    cavernImage: ["", "", "", ""],
    planarImage: ["", ""],
  });

  const [filterLcByPath, setFilterLcByPath] = useState(false);

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

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [buildNameInput, setBuildNameInput] = useState("");

  const [topStats, setTopStats] = useState(null);

  useEffect(() => {
    if (location.state?.editBuild) {
      const build = location.state.editBuild;
      const currentBuildId = build.id || null;

      editBuildIdRef.current = currentBuildId;
      setEditBuildId(currentBuildId);
      
      setPesquisaFiltro({
        charName: build.character?.name || "",
        lcName: build.light_cone?.name || "",
        cavernName: build.relics?.cavernName || "",
        planarName: build.relics?.planarName || "",
      });

      if (build.relics) {
        setRelicStats({
          head: build.relics.head || { main: { stat: null, value: null }, subs: [{ stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }] },
          hands: build.relics.hands || { main: { stat: null, value: null }, subs: [{ stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }] },
          body: build.relics.body || { main: { stat: null, value: null }, subs: [{ stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }] },
          boots: build.relics.boots || { main: { stat: null, value: null }, subs: [{ stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }] },
          sphere: build.relics.sphere || { main: { stat: null, value: null }, subs: [{ stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }] },
          rope: build.relics.rope || { main: { stat: null, value: null }, subs: [{ stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }, { stat: null, value: null }] },
        });
      }

      setBuildNameInput(build.build_name || "");
    }
  }, [location.state]);

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
            charPath: res.visuals.charPath || null,
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

  useEffect(() => {
    const fetchTopStats = async () => {
      try {
        const payload = { charName: PesquisaFiltro.charName };
        const res = await postApi("/github/calculator/top-stats", payload);
        if (res) {
          setTopStats(res);
        }
      } catch (error) {
        console.error("Erro ao buscar top stats:", error);
      }
    };

    fetchTopStats();
  }, [PesquisaFiltro.charName]);

  const handleSaveBuild = async () => {
    try {
      const currentEditBuildId = editBuildId || editBuildIdRef.current || null;
      const userStr = sessionStorage.getItem("user") || localStorage.getItem("user");
      if (!userStr) {
        alert("Você precisa estar logado para salvar uma build.");
        return;
      }

      const userObj = JSON.parse(userStr);
      const userId = userObj.id || userObj.usuario_id;

      if (!userId) {
        alert("Sessão de usuário inválida. Faça login novamente.");
        return;
      }

      if (!PesquisaFiltro.charName) {
        alert("Selecione um personagem para poder salvar a build.");
        return;
      }

      if (!buildNameInput || buildNameInput.trim() === "") {
        alert("Dê um nome para a sua build!");
        return;
      }

      const cavernObj = OpcoesFiltros.cavernName.find(c => c.name === PesquisaFiltro.cavernName);
      const planarObj = OpcoesFiltros.planarName.find(p => p.name === PesquisaFiltro.planarName);

      const payload = {
        id: currentEditBuildId,
        character: { name: PesquisaFiltro.charName },
        light_cones: { name: PesquisaFiltro.lcName, lcInfo: lcInfo },
        relics: {
          ...relicStats,
          cavernName: PesquisaFiltro.cavernName,
          cavernId: cavernObj ? cavernObj.id : null,
          planarName: PesquisaFiltro.planarName,
          planarId: planarObj ? planarObj.id : null
        },
        final_stats: finalStats,
        usuario_id: userId,
        build_name: buildNameInput.trim()
      };

      const res = await postApi("/github/calculator/save", payload);

      if (res && res.success) {
        alert(currentEditBuildId ? "Build atualizada com sucesso!" : "Build salva com sucesso!");
        setShowSaveDialog(false);
        if (res.build && res.build.id) {
          editBuildIdRef.current = res.build.id;
          setEditBuildId(res.build.id);
        }
      } else {
        alert("Erro ao salvar build: " + (res.error || "Desconhecido"));
      }
    } catch (error) {
      console.error("Erro ao salvar a build:", error);
      alert("Ocorreu um erro inesperado ao salvar a build.");
    }
  };

  const dialogFooter = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowSaveDialog(false)} className="p-button-text" />
      <Button label="Confirmar" icon="pi pi-check" onClick={handleSaveBuild} autoFocus />
    </div>
  );

  const formatChartData = (dataArray, optionsArray = []) => {
    if (!dataArray || dataArray.length === 0) return null;
    const labels = dataArray.map((item) => item.name);
    const data = dataArray.map((item) => parseInt(item.count, 10));
    const backgroundColor = ['#c9aa71', '#8c00ff', '#0078d7', '#d14d4d', '#4db071'];
    const hoverBackgroundColor = ['#e6cd98', '#a836ff', '#3b9dff', '#e66767', '#6cd18f'];
    
    const customLabels = dataArray.map((item, idx) => {
      let icon = "";
      if (optionsArray && optionsArray.length > 0) {
        const found = optionsArray.find(opt => opt.name === item.name);
        if (found) icon = found.icon || found.preview || "";
      }
      return { 
        name: item.name, 
        icon, 
        count: item.count, 
        color: backgroundColor[idx % backgroundColor.length] 
      };
    });

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          hoverBackgroundColor,
          borderWidth: 0
        }
      ],
      customLabels
    };
  };

  const trendingRank = topStats?.characters?.findIndex(c => c.name === PesquisaFiltro.charName) + 1 || 0;

  const hasChartData = topStats?.caverns?.length > 0 || topStats?.planars?.length > 0 || topStats?.lightCones?.length > 0;

  const displayedLcOptions = filterLcByPath && OpcoesFiltros.charPath
    ? OpcoesFiltros.lcName.filter(lc => lc.path_name === OpcoesFiltros.charPath.name)
    : OpcoesFiltros.lcName;

  return (
    <>
      <div className="editor-page-wrapper">
        <LateralBar />
        <div className="editor-main-column">
          <div className="build-editor-main">
            <div className="left-side">
              <div className="preview-row">
                <div className="preview-col">
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
                      {trendingRank > 0 && (
                        <div className="trending-badge">
                          <i className="pi pi-fire"></i>
                          <span>{trendingRank}º dos 10 em alta</span>
                        </div>
                      )}
                      <img src={OpcoesFiltros.charImage} alt={Filtro.charName} />
                    </div>
                  </div>
                </div>

                <div className="preview-col">
                  <div className="inputtext-be" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <BtnInputText
                        PesquisaFiltro={PesquisaFiltro}
                        setPesquisaFiltro={setPesquisaFiltro}
                        Campo={"lcName"}
                        Opcoes={displayedLcOptions}
                      />
                    </div>
                    <div className="flex align-items-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Checkbox 
                        inputId="filterLcPath" 
                        checked={filterLcByPath} 
                        onChange={(e) => setFilterLcByPath(e.checked)} 
                        disabled={!PesquisaFiltro.charName || !OpcoesFiltros.charPath} 
                        tooltip="Filtrar cones pelo caminho do personagem"
                        tooltipOptions={{ position: 'top' }}
                      />
                    </div>
                  </div>
                  <GeneralCard
                    itemName={lcInfo ? lcInfo.name : "Nenhum Cone Selecionado"}
                    itemRarity={lcInfo ? String(lcInfo.rarity) : "5"}
                    itemImage={OpcoesFiltros.lcImage}
                    itemIcon1={lcInfo && lcInfo.path ? lcInfo.path.icon : ""}
                    layout="vertical"
                  />
                </div>
              </div>

              <StatsCard stats={finalStats} />
            </div>

            <div className="right-side">
              <Card title="Relíquias e Ornamentos" className="relics-container" style={{ position: 'relative', overflow: 'visible' }}>
                <div className="save-build-container" style={{ position: 'absolute', top: '0', right: '0', zIndex: 10 }}>
                  <Button label="Salvar Build" icon="pi pi-save" onClick={() => setShowSaveDialog(true)} className="btn-sedutora" />
                </div>
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

          {/* Seção de Gráficos de Top 5 */}
          {PesquisaFiltro.charName && hasChartData && (
            <div className="charts-container" style={{ display: 'flex', gap: '20px', padding: '16px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ flex: '1 1 calc(33.333% - 20px)' }}>
                <GenericChart title="Top 5 Relíquias" data={formatChartData(topStats?.caverns, OpcoesFiltros.cavernName)} />
              </div>
              <div style={{ flex: '1 1 calc(33.333% - 20px)' }}>
                <GenericChart title="Top 5 Ornamentos" data={formatChartData(topStats?.planars, OpcoesFiltros.planarName)} />
              </div>
              <div style={{ flex: '1 1 calc(33.333% - 20px)' }}>
                <GenericChart title="Top 5 Cones de Luz" data={formatChartData(topStats?.lightCones, OpcoesFiltros.lcName)} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Dialog
        header="Salvar Build"
        visible={showSaveDialog}
        style={{ width: '30vw' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        onHide={() => setShowSaveDialog(false)}
        footer={dialogFooter}
        className="custom-build-dialog"
        maskClassName="custom-build-dialog-mask"
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="buildName" style={{ display: 'block', marginBottom: '8px' }}>Nome da Build</label>
            <InputText id="buildName" value={buildNameInput} onChange={(e) => setBuildNameInput(e.target.value)} placeholder="Ex: Seele DPS Principal..." autoFocus />
          </div>
        </div>
      </Dialog>
    </>
  );
}
