import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Stts } from "../../../../backend/src/utils/variables";

export default function RelicsSttsForm({ type, relicData, setRelicStats }) {
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
          value={relicData.main.stat}
          onChange={(e) => {
            setRelicStats((prev) => ({
              ...prev,
              [type]: {
                ...prev[type],
                main: {
                  ...prev[type].main,
                  stat: e.value,
                },
              },
            }));
          }}
        />
        <InputNumber
          value={relicData.main.value}
          onValueChange={(e) => {
            setRelicStats((prev) => ({
              ...prev,
              [type]: {
                ...prev[type],
                main: {
                  ...prev[type].main,
                  value: e.value,
                },
              },
            }));
          }}
          mode="decimal"
          suffix={relicData.main.stat?.percent ? "%" : ""}
        />
      </div>

      <h4>Substats</h4>

      {subStatsRows.map((_, index) => (
        <div className="stat-row" key={index}>
          <Dropdown
            options={subStats}
            optionLabel="name"
            placeholder="Selecione o stat"
            value={relicData.subs[index].stat}
            onChange={(e) => {
              setRelicStats((prev) => {
                const newSubs = [...prev[type].subs];
                newSubs[index] = {
                  ...newSubs[index],
                  stat: e.value,
                };

                return {
                  ...prev,
                  [type]: {
                    ...prev[type],
                    subs: newSubs,
                  },
                };
              });
            }}
          />

          <InputNumber
            value={relicData.subs[index].value}
            onValueChange={(e) => {
              setRelicStats((prev) => {
                const newSubs = [...prev[type].subs];
                newSubs[index] = {
                  ...newSubs[index],
                  value: e.value,
                };

                return {
                  ...prev,
                  [type]: {
                    ...prev[type],
                    subs: newSubs,
                  },
                };
              });
            }}
            mode="decimal"
            suffix={relicData.subs[index].stat?.percent ? "%" : ""}
          />
        </div>
      ))}
    </div>
  );
}
