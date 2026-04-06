import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

const BtnInputText = ({ PesquisaFiltro, setPesquisaFiltro, Campo, Opcoes }) => {
  const [ItensFiltrados, setItensFiltrados] = useState([]);

  const search = (event) => {
    const query = event.query.toLowerCase();

    const filtered = Opcoes.filter((item) =>
      item.toLowerCase().includes(query),
    );

    setItensFiltrados(filtered);
  };

  const pesquisa = (valor) => {
    setPesquisaFiltro({
      ...PesquisaFiltro,
      [Campo]: valor,
    });
  };

  return (
    <AutoComplete
      value={PesquisaFiltro[Campo]}
      suggestions={ItensFiltrados}
      completeMethod={search}
      onChange={(e) => pesquisa(e.value)}
      placeholder="Sem Filtros"
      dropdown
    />
  );
};

export default BtnInputText;
