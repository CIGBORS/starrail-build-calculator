import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import "./BtnInputText.css";

const BtnInputText = ({ PesquisaFiltro, setPesquisaFiltro, Campo, Opcoes }) => {
  const [ItensFiltrados, setItensFiltrados] = useState([]);

  const isObject = Opcoes && Opcoes.length > 0 && typeof Opcoes[0] === "object";

  const search = (event) => {
    const query = event.query.toLowerCase();

    const filtered = Opcoes.filter((item) => {
      const value = isObject ? item.name : item;
      return value.toLowerCase().includes(query);
    });

    setItensFiltrados(filtered);
  };

  const pesquisa = (valor) => {
    const valueToSet = typeof valor === "object" ? valor.name : valor;
    setPesquisaFiltro({
      ...PesquisaFiltro,
      [Campo]: valueToSet,
    });
  };

  const itemTemplate = (item) => {
    if (isObject) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {item.icon && <img src={item.icon} alt={item.name} style={{ width: "32px", height: "32px", objectFit: "cover" }} />}
          {item.path_icon && <img src={item.path_icon} alt="Path" style={{ width: "24px", height: "24px" }} />}
          <span>{item.name}</span>
        </div>
      );
    }
    return <span>{item}</span>;
  };

  return (
    <AutoComplete
      appendTo="self"
      value={PesquisaFiltro[Campo]}
      suggestions={ItensFiltrados}
      completeMethod={search}
      onChange={(e) => pesquisa(e.value)}
      field={isObject ? "name" : undefined}
      itemTemplate={itemTemplate}
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
