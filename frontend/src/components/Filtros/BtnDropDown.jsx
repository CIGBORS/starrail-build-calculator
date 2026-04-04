import React from "react";
import { MultiSelect } from "primereact/multiselect";
const BtnDropDown = ({
  Opcoes,
  Filtro,
  setFiltro,
  PesquisaFiltro,
  setPesquisaFiltro,
  Campo,
}) => {
  const pesquisa = async (texto) => {
    setPesquisaFiltro({ ...PesquisaFiltro, [Campo]: texto });
  };

  const handleChange = (e) => {
    const valor = defValor(e.value);
    setFiltro((prev) => ({
      ...prev,
      [Campo]: valor,
    }));
  };

  return (
    <MultiSelect
      appendTo={"self"}
      value={Filtro[Campo]}
      options={Opcoes}
      onChange={handleChange}
      placeholder={"Sem Filtros"}
      filter
      onFilter={(e) => pesquisa(e.filter)}
      maxSelectedLabels={2}
      showClear
    />
  );
};

const defValor = (valor) => {
  return valor === undefined ? [] : valor;
};

export default BtnDropDown;
