import React from "react";
import { MultiSelect } from "primereact/multiselect";
import "./BtnDropdown.css";

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
      appendTo="self"
      value={Filtro[Campo]}
      options={Opcoes}
      onChange={handleChange}
      placeholder="Sem Filtros"
      filter
      onFilter={(e) => pesquisa(e.filter)}
      maxSelectedLabels={2}
      showClear
      pt={{
        root: { className: 'multiselect-filter' },
        trigger: { className: 'multiselect-filter__trigger' },
        panel: { className: 'multiselect-filter__panel' },
        header: { className: 'multiselect-filter__header' },
        item: ({ context }) => ({
          className: `multiselect-filter__item ${context.selected ? 'multiselect-filter__item--selected' : ''}`
        }),
        token: { className: 'multiselect-filter__token' },
        clearIcon: { className: 'multiselect-filter__clear' },
        filterInput: { className: 'multiselect-filter__input' }
      }}
      panelClassName="multiselect-filter__panel"
    />
  );
};

const defValor = (valor) => {
  return valor === undefined ? [] : valor;
};

export default BtnDropDown;
