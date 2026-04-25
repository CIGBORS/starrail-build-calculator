import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import BtnInputText from "../Filters/BtnInputText/BtnInputText";
import RelicsSttsForm from "../RelicsSttsForm/RelicsSttsForm";
import "./relicstable.css";

export default function RelicsCardTable({
  sFilterMain,
  setFilterMain,
  mainKey,
  imageKey,
  mainFilterOptions,
  relicsUserStatis,
  setUserRelicStats,
  relicstypes,
}) {
  return (
    <Card title="Body" className="relics-container">
      <div className="inputtext-be">
        <BtnInputText
          PesquisaFiltro={sFilterMain}
          setPesquisaFiltro={setFilterMain}
          Campo={mainKey}
          Opcoes={mainFilterOptions[mainKey]}
        />
      </div>

      <div className="relics-grid">
        {relicstypes.map((type, index) => (
          <RelicsSttsForm
            key={type}
            type={type}
            relicData={relicsUserStatis[type]}
            setRelicStats={setUserRelicStats}
            image={mainFilterOptions[imageKey][index]}
          />
        ))}
      </div>
    </Card>
  );
}
