import { getAllCharactersCard, getAllLightConesCard, getAllRelicsCard } from "./starRail.service.js";
import { applyPassiveConversions } from "../../../shared/characterPassives.js";
import { Stts } from "../../../shared/variables.js";

export async function calculateBuild(payload) {
  const { charName, lcName, cavernName, planarName, relicStats } = payload;

  let charData = null;
  let charBaseStats = null;
  if (charName) {
    const chars = await getAllCharactersCard({ name: charName });
    if (chars && chars.length > 0) {
      charData = chars[0];
      charBaseStats = {
        ...chars[0].stats,
        trace_stats: chars[0].trace_stats,
        charId: chars[0].id,
      };
    }
  }

  let lcInfo = null;
  let lcBaseStats = null;
  if (lcName) {
    const lcs = await getAllLightConesCard({ name: lcName });
    if (lcs && lcs.length > 0) {
      lcInfo = lcs[0];
      lcBaseStats = lcs[0].stats;
    }
  }

  let cavernData = null;
  if (cavernName) {
    const caverns = await getAllRelicsCard({ name: cavernName });
    if (caverns && caverns.length > 0) {
      cavernData = caverns[0];
    }
  }

  let planarData = null;
  if (planarName) {
    const planars = await getAllRelicsCard({ name: planarName });
    if (planars && planars.length > 0) {
      planarData = planars[0];
    }
  }

  // Visuals block
  const visuals = {
    charImage: charData ? charData.preview : "https://static.wikia.nocookie.net/houkai-star-rail/images/7/77/Sticker_PPG_16_March_7th_02.png/revision/latest?cb=20240913030332",
    lcImage: lcInfo ? (lcInfo.portrait || lcInfo.preview || lcInfo.icon) : "https://static.wikia.nocookie.net/houkai-star-rail/images/e/ea/Icon_Light_Cone.png/revision/latest?cb=20240130190656",
    lcInfo: lcInfo || null,
    cavernImage: cavernData ? cavernData.icons.slice(0, 4) : ["", "", "", ""],
    planarImage: planarData ? planarData.icons.slice(0, 2) : ["", ""],
  };

  // If no char, return empty/placeholder finalStats
  if (!charBaseStats) {
    return {
      visuals,
      finalStats: {
        hp: "{X}", atk: "{X}", def: "{X}", spd: "{X}",
        crit_rate: "{X}", crit_dmg: "{X}", break: "{X}",
        effect_hit: "{X}", effect_res: "{X}", energy: "{X}", heal: "{X}",
        aggro: "{X}",
        dmg_physical: "{X}", dmg_fire: "{X}", dmg_ice: "{X}",
        dmg_lightning: "{X}", dmg_wind: "{X}", dmg_quantum: "{X}",
        dmg_imaginary: "{X}", dmg_elation: "{X}"
      }
    };
  }

  const baseHp = charBaseStats.hp + (lcBaseStats ? lcBaseStats.hp : 0);
  const baseAtk = charBaseStats.atk + (lcBaseStats ? lcBaseStats.atk : 0);
  const baseDef = charBaseStats.def + (lcBaseStats ? lcBaseStats.def : 0);
  const baseSpd = charBaseStats.spd;
  const baseCritRate = charBaseStats.crit_rate || 0;
  const baseCritDmg = charBaseStats.crit_dmg || 0;

  let totals = {
    flat: { hp: 0, atk: 0, def: 0, spd: 0 },
    percent: {
      hp: 0, atk: 0, def: 0, spd: 0,
      crit_rate: 0, crit_dmg: 0, break: 0,
      effect_hit: 0, effect_res: 0, energy: 0, heal: 0,
      all_dmg: 0, dmg_physical: 0, dmg_fire: 0, dmg_ice: 0,
      dmg_lightning: 0, dmg_wind: 0, dmg_quantum: 0, dmg_imaginary: 0, dmg_elation: 0
    }
  };

  if (relicStats) {
    Object.values(relicStats).forEach(relic => {
      const statsToProcess = [relic.main, ...(relic.subs || [])];
      statsToProcess.forEach(s => {
        if (!s || !s.stat || !s.value) return;
        const statInfo = Stts[s.stat];
        if (!statInfo) return;

        if (statInfo.percent) {
          totals.percent[statInfo.field] += Number(s.value);
        } else {
          totals.flat[statInfo.field] += Number(s.value);
        }
      });
    });
  }

  const propMap = {
    HPAddedRatio: { field: "hp", percent: true },
    AttackAddedRatio: { field: "atk", percent: true },
    DefenceAddedRatio: { field: "def", percent: true },
    SpeedDelta: { field: "spd", percent: false },
    CriticalChanceBase: { field: "crit_rate", percent: true },
    CriticalDamageBase: { field: "crit_dmg", percent: true },
    BreakDamageAddedRatioBase: { field: "break", percent: true },
    StatusProbabilityBase: { field: "effect_hit", percent: true },
    StatusResistanceBase: { field: "effect_res", percent: true },
    SPRatioBase: { field: "energy", percent: true },
    HealRatioBase: { field: "heal", percent: true },
    AllDamageTypeAddedRatio: { field: "all_dmg", percent: true },
    PhysicalAddedRatio: { field: "dmg_physical", percent: true },
    FireAddedRatio: { field: "dmg_fire", percent: true },
    IceAddedRatio: { field: "dmg_ice", percent: true },
    LightningAddedRatio: { field: "dmg_lightning", percent: true },
    ThunderAddedRatio: { field: "dmg_lightning", percent: true },
    WindAddedRatio: { field: "dmg_wind", percent: true },
    QuantumAddedRatio: { field: "dmg_quantum", percent: true },
    ImaginaryAddedRatio: { field: "dmg_imaginary", percent: true },
    ElationAddedRatio: { field: "dmg_elation", percent: true },
  };

  if (lcInfo && lcInfo.properties) {
    lcInfo.properties.forEach((prop) => {
      const mapped = propMap[prop.type];
      if (mapped) {
        const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
        if (mapped.percent) {
          totals.percent[mapped.field] += valToAdd;
        } else {
          totals.flat[mapped.field] += valToAdd;
        }
      }
    });
  }

  if (charBaseStats.trace_stats) {
    charBaseStats.trace_stats.forEach((prop) => {
      const mapped = propMap[prop.type];
      if (mapped) {
        const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
        if (mapped.percent) {
          totals.percent[mapped.field] += valToAdd;
        } else {
          totals.flat[mapped.field] += valToAdd;
        }
      }
    });
  }

  if (cavernData && cavernData.properties) {
    cavernData.properties.forEach((propList) => {
      propList.forEach((prop) => {
        const mapped = propMap[prop.type];
        if (mapped) {
          const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
          if (mapped.percent) {
            totals.percent[mapped.field] += valToAdd;
          } else {
            totals.flat[mapped.field] += valToAdd;
          }
        }
      });
    });
  }

  if (planarData && planarData.properties) {
    planarData.properties.forEach((propList) => {
      propList.forEach((prop) => {
        const mapped = propMap[prop.type];
        if (mapped) {
          const valToAdd = mapped.percent ? prop.value * 100 : prop.value;
          if (mapped.percent) {
            totals.percent[mapped.field] += valToAdd;
          } else {
            totals.flat[mapped.field] += valToAdd;
          }
        }
      });
    });
  }

  const rawFinal = {
    hp: Math.floor(baseHp * (1 + totals.percent.hp / 100) + totals.flat.hp),
    atk: Math.floor(baseAtk * (1 + totals.percent.atk / 100) + totals.flat.atk),
    def: Math.floor(baseDef * (1 + totals.percent.def / 100) + totals.flat.def),
    spd: baseSpd * (1 + totals.percent.spd / 100) + totals.flat.spd,
    crit_rate: baseCritRate * 100 + totals.percent.crit_rate,
    crit_dmg: baseCritDmg * 100 + totals.percent.crit_dmg,
    break: totals.percent.break,
    effect_hit: totals.percent.effect_hit,
    effect_res: totals.percent.effect_res,
    energy: 100 + totals.percent.energy,
    heal: totals.percent.heal,
    aggro: charBaseStats.taunt || 0,
    dmg_physical: totals.percent.dmg_physical + totals.percent.all_dmg,
    dmg_fire: totals.percent.dmg_fire + totals.percent.all_dmg,
    dmg_ice: totals.percent.dmg_ice + totals.percent.all_dmg,
    dmg_lightning: totals.percent.dmg_lightning + totals.percent.all_dmg,
    dmg_wind: totals.percent.dmg_wind + totals.percent.all_dmg,
    dmg_quantum: totals.percent.dmg_quantum + totals.percent.all_dmg,
    dmg_imaginary: totals.percent.dmg_imaginary + totals.percent.all_dmg,
    dmg_elation: totals.percent.dmg_elation,
  };

  const withPassives = applyPassiveConversions(rawFinal, charBaseStats.charId);

  const finalStats = {
    hp: withPassives.hp,
    atk: withPassives.atk,
    def: withPassives.def,
    spd: withPassives.spd.toFixed(1),
    crit_rate: withPassives.crit_rate.toFixed(1),
    crit_dmg: withPassives.crit_dmg.toFixed(1),
    break: withPassives.break.toFixed(1),
    effect_hit: withPassives.effect_hit.toFixed(1),
    effect_res: withPassives.effect_res.toFixed(1),
    energy: withPassives.energy.toFixed(1),
    heal: withPassives.heal.toFixed(1),
    aggro: withPassives.aggro,
    dmg_physical: withPassives.dmg_physical.toFixed(1),
    dmg_fire: withPassives.dmg_fire.toFixed(1),
    dmg_ice: withPassives.dmg_ice.toFixed(1),
    dmg_lightning: withPassives.dmg_lightning.toFixed(1),
    dmg_wind: withPassives.dmg_wind.toFixed(1),
    dmg_quantum: withPassives.dmg_quantum.toFixed(1),
    dmg_imaginary: withPassives.dmg_imaginary.toFixed(1),
    dmg_elation: withPassives.dmg_elation.toFixed(1),
  };

  return {
    visuals,
    finalStats
  };
}
