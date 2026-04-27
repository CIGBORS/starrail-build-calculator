import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Stts } from "../../../../shared/variables";
import "./RelicsSttsForm.css";

const BASE_ICON_URL =
  "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconMaxHP.png";

// Small heart-style icon for sub-stat slots
const SUB_ICON_URL =
  "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconMaxHP.png";

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
          if (!stat.main.includes(type)) return false;
        } else {
          if (!stat.affix) return false;
        }
        return !blockedKeys.includes(key);
      })
      .map((key) => ({ key, ...Stts[key] }));
  };

  const updateMainStat = (field, value) => {
    setRelicStats((prev) => {
      let newValue = value;
      let extraChanges = {};
      if (field === "stat") {
        const statInfo = Stts[value];
        if (statInfo && statInfo.maxValue !== undefined) {
          extraChanges = { value: statInfo.maxValue };
        }
      }
      return {
        ...prev,
        [type]: {
          ...prev[type],
          main: { ...prev[type].main, [field]: newValue, ...extraChanges },
        },
      };
    });
  };

  const updateSubStat = (index, field, value) => {
    setRelicStats((prev) => {
      const newSubs = [...prev[type].subs];
      newSubs[index] = { ...newSubs[index], [field]: value };
      return { ...prev, [type]: { ...prev[type], subs: newSubs } };
    });
  };

  return (
    <div className="relic-form">
      {/* Relic image */}
      <div className="relic-image-wrapper">
        {image ? (
          <img src={image} alt={type} className="relic-image" />
        ) : (
          <div className="relic-image-placeholder" />
        )}
      </div>

      {/* Main stat */}
      <div className="main-stat-row">
        <Dropdown
          options={filterAvailableStats(true)}
          optionLabel="name"
          optionValue="key"
          placeholder="Main stat"
          value={relicData.main.stat}
          onChange={(e) => updateMainStat("stat", e.value)}
        />
        <InputNumber
          value={relicData.main.value}
          onValueChange={(e) => updateMainStat("value", e.value)}
          mode="decimal"
          maxFractionDigits={2}
          suffix={Stts[relicData.main.stat]?.percent ? "%" : ""}
        />
      </div>

      {/* Sub stats */}
      {subStatsRows.map((_, index) => (
        <div className="sub-stat-row" key={index}>
          <img
            className="sub-stat-icon"
            src={`https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${
              relicData.subs[index].stat && Stts[relicData.subs[index].stat]?.icon
                ? Stts[relicData.subs[index].stat].icon
                : "icon/property/IconMaxHP.png"
            }`}
            alt=""
            onError={(e) => { e.target.style.opacity = "0.3"; }}
          />
          <Dropdown
            options={filterAvailableStats(false, index)}
            optionLabel="name"
            optionValue="key"
            placeholder="Sub"
            value={relicData.subs[index].stat}
            onChange={(e) => updateSubStat(index, "stat", e.value)}
          />
          <InputNumber
            value={relicData.subs[index].value}
            onValueChange={(e) => updateSubStat(index, "value", e.value)}
            mode="decimal"
            maxFractionDigits={2}
            suffix={Stts[relicData.subs[index].stat]?.percent ? "%" : ""}
          />
        </div>
      ))}
    </div>
  );
}
