import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import "./BtnInputText.css";

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
      appendTo="self"
      value={PesquisaFiltro[Campo]}
      suggestions={ItensFiltrados}
      completeMethod={search}
      onChange={(e) => pesquisa(e.value)}
      placeholder="Sem Filtros"
      inputClassName="autocomplete-filter__input"
      dropdown
      pt={{
        root: { className: "autocomplete-filter" },
        dropdownButton: { className: "autocomplete-filter__dropdown" },
        panel: { className: "autocomplete-filter__panel" },
        list: { className: "autocomplete-filter__list" },
        item: ({ context }) => ({
          className: `autocomplete-filter__item ${
            context.selected ? "autocomplete-filter__item--selected" : ""
          }`,
        }),
        token: { className: "autocomplete-filter__token" },
        clearIcon: { className: "autocomplete-filter__clear" },
      }}
    />
  );
};

export default BtnInputText;
