import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Stts } from "../../../../backend/src/utils/variables";

export default function RelicsSttsForm({
  type,
  relicData,
  setRelicStats,
  image,
}) {
  const subStatsRows = Array.from({ length: 4 });

  const filterAvailableStats = (isMain = false, currentIndex = null) => {
    const blockedKeys = [];

    if (!isMain && relicData.main.stat) {
      blockedKeys.push(relicData.main.stat);
    }

    relicData.subs.forEach((sub, index) => {
      if (!sub.stat) return;

      if (!isMain && index === currentIndex) return;

      blockedKeys.push(sub.stat);
    });

    return Object.keys(Stts)
      .filter((key) => {
        const stat = Stts[key];

        if (isMain) {
          if (!stat.main.includes(type)) {
            return false;
          }
        } else {
          if (!stat.affix) {
            return false;
          }
        }

        return !blockedKeys.includes(key);
      })
      .map((key) => ({
        key,
        ...Stts[key],
      }));
  };

  const updateMainStat = (field, value) => {
    setRelicStats((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        main: {
          ...prev[type].main,
          [field]: value,
        },
      },
    }));
  };

  const updateSubStat = (index, field, value) => {
    setRelicStats((prev) => {
      const newSubs = [...prev[type].subs];

      newSubs[index] = {
        ...newSubs[index],
        [field]: value,
      };

      return {
        ...prev,
        [type]: {
          ...prev[type],
          subs: newSubs,
        },
      };
    });
  };
  return (
    <div className="relic-form">
      <img src={image} alt={type} className="relic-image" />
      <h4>Main Stat</h4>

      <div className="stat-row">
        <Dropdown
          options={filterAvailableStats(true)}
          optionLabel="name"
          optionValue="key"
          placeholder="Selecione o stat"
          value={relicData.main.stat}
          onChange={(e) => updateMainStat("stat", e.value)}
        />

        <InputNumber
          value={relicData.main.value}
          onValueChange={(e) => updateMainStat("value", e.value)}
          mode="decimal"
          suffix={Stts[relicData.main.stat]?.percent ? "%" : ""}
        />
      </div>

      <h4>Substats</h4>

      {subStatsRows.map((_, index) => (
        <div className="stat-row" key={index}>
          <Dropdown
            options={filterAvailableStats(false, index)}
            optionLabel="name"
            optionValue="key"
            placeholder="Selecione o stat"
            value={relicData.subs[index].stat}
            onChange={(e) => updateSubStat(index, "stat", e.value)}
          />

          <InputNumber
            value={relicData.subs[index].value}
            onValueChange={(e) => updateSubStat(index, "value", e.value)}
            mode="decimal"
            suffix={Stts[relicData.subs[index].stat]?.percent ? "%" : ""}
          />
        </div>
      ))}
    </div>
  );
}
