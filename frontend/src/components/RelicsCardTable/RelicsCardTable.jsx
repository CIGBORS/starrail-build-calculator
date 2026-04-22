import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import BtnInputText from "../Filters/BtnInputText/BtnInputText";
import RelicsSttsForm from "../RelicsSttsForm/RelicsSttsForm";

export default function RelicsCardTable({
  sFilterMain,
  setFilterMain,
  mainKey,
  mainFilterOptions,
}) {
  const relics = ["head", "hands", "body", "speed", "sphere", "rope"];
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

      <RelicsSttsForm type={"head"} />
      <RelicsSttsForm type={"hands"} />
      <RelicsSttsForm type={"body"} />
      <RelicsSttsForm type={"boots"} />
      <RelicsSttsForm type={"sphere"} />
      <RelicsSttsForm type={"rope"} />
    </Card>
  );
}
