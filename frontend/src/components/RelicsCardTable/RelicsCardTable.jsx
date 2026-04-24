import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import BtnInputText from "../Filters/BtnInputText/BtnInputText";
import RelicsSttsForm from "../RelicsSttsForm/RelicsSttsForm";

export default function RelicsCardTable({
  sFilterMain,
  setFilterMain,
  mainKey,
  mainFilterOptions,
  relicsUserStatis,
  setUserRelicStats,
  relicstypes,
}) {
  return (
    <Card title="Body">
      <div className="inputtext-be">
        <BtnInputText
          PesquisaFiltro={sFilterMain}
          setPesquisaFiltro={setFilterMain}
          Campo={mainKey}
          Opcoes={mainFilterOptions[mainKey]}
        />
      </div>
      {relicstypes.map((type) => (
        <RelicsSttsForm
          key={type}
          type={type}
          relicData={relicsUserStatis[type]}
          setRelicStats={setUserRelicStats}
        />
      ))}
    </Card>
  );
}
