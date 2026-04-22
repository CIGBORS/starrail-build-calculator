export const Stts = {
  HPDelta: {
    name: "PV",
    field: "hp",
    percent: false,
    affix: true,
    main: ["head"],
  },

  HPAddedRatio: {
    name: "PV%",
    field: "hp",
    percent: true,
    affix: true,
    main: ["body", "boots", "sphere", "rope"],
  },

  AttackDelta: {
    name: "ATQ",
    field: "atk",
    percent: false,
    affix: true,
    main: ["hands"],
  },

  AttackAddedRatio: {
    name: "ATQ%",
    field: "atk",
    percent: true,
    affix: true,
    main: ["body", "boots", "sphere", "rope"],
  },

  DefenceDelta: {
    name: "DEF",
    field: "def",
    percent: false,
    affix: true,
    main: [],
  },

  DefenceAddedRatio: {
    name: "DEF%",
    field: "def",
    percent: true,
    affix: true,
    main: ["body", "boots", "sphere", "rope"],
  },

  SpeedDelta: {
    name: "Velocidade",
    field: "spd",
    percent: false,
    affix: true,
    main: ["boots"],
  },

  CriticalChanceBase: {
    name: "Taxa Crit",
    field: "crit_rate",
    percent: true,
    affix: true,
    main: ["body"],
  },

  CriticalDamageBase: {
    name: "Dano Crit",
    field: "crit_dmg",
    percent: true,
    affix: true,
    main: ["body"],
  },

  BreakDamageAddedRatioBase: {
    name: "Break Effect",
    field: "break",
    percent: true,
    affix: true,
    main: ["rope"],
  },

  StatusProbabilityBase: {
    name: "Effect Hit Rate",
    field: "effect_hit",
    percent: true,
    affix: true,
    main: ["body"],
  },

  StatusResistanceBase: {
    name: "Effect RES",
    field: "effect_res",
    percent: true,
    affix: true,
    main: ["body"],
  },

  HealRatioBase: {
    name: "Cura",
    field: "heal",
    percent: true,
    affix: false,
    main: ["body"],
  },

  SPDRatio: {
    name: "Energy Regen",
    field: "energy",
    percent: true,
    affix: false,
    main: ["rope"],
  },

  PhysicalAddedRatio: {
    name: "Dano Físico",
    field: "dmg",
    element: "physical",
    percent: true,
    affix: false,
    main: ["sphere"],
  },

  FireAddedRatio: {
    name: "Dano Fogo",
    field: "dmg",
    element: "fire",
    percent: true,
    affix: false,
    main: ["sphere"],
  },

  IceAddedRatio: {
    name: "Dano Gelo",
    field: "dmg",
    element: "ice",
    percent: true,
    affix: false,
    main: ["sphere"],
  },

  ThunderAddedRatio: {
    name: "Dano Raio",
    field: "dmg",
    element: "lightning",
    percent: true,
    affix: false,
    main: ["sphere"],
  },

  WindAddedRatio: {
    name: "Dano Vento",
    field: "dmg",
    element: "wind",
    percent: true,
    affix: false,
    main: ["sphere"],
  },

  QuantumAddedRatio: {
    name: "Dano Quantum",
    field: "dmg",
    element: "quantum",
    percent: true,
    affix: false,
    main: ["sphere"],
  },

  ImaginaryAddedRatio: {
    name: "Dano Imaginário",
    field: "dmg",
    element: "imaginary",
    percent: true,
    affix: false,
    main: ["sphere"],
  },
};
