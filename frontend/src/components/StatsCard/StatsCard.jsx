import "./StatsCard.css";

const BASE_ICON_URL =
  "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

const STAT_ICONS = {
  hp:         "icon/property/IconMaxHP.png",
  atk:        "icon/property/IconAttack.png",
  def:        "icon/property/IconDefence.png",
  spd:        "icon/property/IconSpeed.png",
  crit_rate:  "icon/property/IconCriticalChance.png",
  crit_dmg:   "icon/property/IconCriticalDamage.png",
  break:      "icon/property/IconBreakUp.png",
  effect_hit: "icon/property/IconStatusProbability.png",
  effect_res: "icon/property/IconStatusResistance.png",
  energy:     "icon/property/IconEnergyRecovery.png",
  heal:       "icon/property/IconHealRatio.png",
  dmg:        "icon/property/IconDamage.png",
};

const STAT_LABELS = {
  hp:         "Vida",
  atk:        "Ataque",
  def:        "Defesa",
  spd:        "Velocidade",
  crit_rate:  "Taxa Crítica",
  crit_dmg:   "Dano Crítico",
  break:      "Ef. Quebra",
  effect_hit: "Taxa Ef. Acerto",
  effect_res: "Res. a Efeito",
  energy:     "Rec. Energia",
  heal:       "Bônus Cura",
  dmg:        "Bônus Dano",
};

const STAT_PERCENT = {
  hp: false, atk: false, def: false, spd: false,
  crit_rate: true, crit_dmg: true, break: true,
  effect_hit: true, effect_res: true, energy: true, heal: true, dmg: true,
};

const STAT_ORDER = [
  "hp", "def", "atk", "spd", "crit_rate", "effect_hit",
  "crit_dmg", "effect_res", "break", "energy", "heal", "dmg",
];

export default function StatsCard({ stats }) {
  return (
    <div className="stats-summary-card">
      {STAT_ORDER.map((field) => (
        <div className="stats-summary-card__item" key={field}>
          <img
            className="stats-summary-card__icon"
            src={BASE_ICON_URL + STAT_ICONS[field]}
            alt={STAT_LABELS[field]}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span className="stats-summary-card__label">{STAT_LABELS[field]}</span>
          <span className="stats-summary-card__value">
            {stats?.[field] ?? "{X}"}{STAT_PERCENT[field] && stats?.[field] !== "{X}" ? "%" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}
