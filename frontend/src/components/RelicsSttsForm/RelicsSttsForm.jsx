import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Stts } from "../../../../backend/src/utils/variables";

export default function RelicsSttsForm({ type }) {
  const mainStats = Object.values(Stts).filter((stat) =>
    stat.main.includes(type),
  );

  const subStats = Object.values(Stts).filter((stat) => stat.affix === true);

  const subStatsRows = Array.from({ length: 4 });

  return (
    <div className="relic-form">
      <h4>Main Stat</h4>

      <div className="stat-row">
        <Dropdown
          options={mainStats}
          optionLabel="name"
          placeholder="Selecione o stat"
        />
        <InputNumber />
      </div>

      <h4>Substats</h4>

      {subStatsRows.map((_, index) => (
        <div className="stat-row" key={index}>
          <Dropdown
            options={subStats}
            optionLabel="name"
            placeholder="Selecione o stat"
          />
          <InputNumber />
        </div>
      ))}
    </div>
  );
}
