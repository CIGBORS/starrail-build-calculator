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
      <RelicsSttsForm />
    </Card>
  );
}
