export const Stts = {
  HPDelta: {
    name: "PV",
    field: "hp",
    percent: false,
    affix: true,
    main: ["head"],
    Summary: "Vida",
  },

  HPAddedRatio: {
    name: "PV%",
    field: "hp",
    percent: true,
    affix: true,
    main: ["body", "boots", "sphere", "rope"],
    Summary: undefined,
  },

  AttackDelta: {
    name: "ATQ",
    field: "atk",
    percent: false,
    affix: true,
    main: ["hands"],
    Summary: "Ataque",
  },

  AttackAddedRatio: {
    name: "ATQ%",
    field: "atk",
    percent: true,
    affix: true,
    main: ["body", "boots", "sphere", "rope"],
    Summary: undefined,
  },

  DefenceDelta: {
    name: "DEF",
    field: "def",
    percent: false,
    affix: true,
    main: [],
    Summary: "Defesa",
  },

  DefenceAddedRatio: {
    name: "DEF%",
    field: "def",
    percent: true,
    affix: true,
    main: ["body", "boots", "sphere", "rope"],
    Summary: undefined,
  },

  SpeedDelta: {
    name: "Velocidade",
    field: "spd",
    percent: false,
    affix: true,
    main: ["boots"],
    Summary: "Velocidade",
  },

  CriticalChanceBase: {
    name: "Taxa Crit",
    field: "crit_rate",
    percent: true,
    affix: true,
    main: ["body"],
    Summary: "Taxa Critica",
  },

  CriticalDamageBase: {
    name: "Dano Crit",
    field: "crit_dmg",
    percent: true,
    affix: true,
    main: ["body"],
    Summary: "Dano Critico",
  },

  BreakDamageAddedRatioBase: {
    name: "Break Effect",
    field: "break",
    percent: true,
    affix: true,
    main: ["rope"],
    Summary: "Efeito de Quebra",
  },

  StatusProbabilityBase: {
    name: "Effect Hit Rate",
    field: "effect_hit",
    percent: true,
    affix: true,
    main: ["body"],
    Summary: "Taxa de Acerto de Efeito",
  },

  StatusResistanceBase: {
    name: "Effect RES",
    field: "effect_res",
    percent: true,
    affix: true,
    main: ["body"],
    Summary: "Resistencia a Efeito",
  },

  HealRatioBase: {
    name: "Cura",
    field: "heal",
    percent: true,
    affix: false,
    main: ["body"],
    Summary: "Bônus de Cura",
  },

  SPDRatio: {
    name: "Energy Regen",
    field: "energy",
    percent: true,
    affix: false,
    main: ["rope"],
    Summary: "Regeneração de Energia",
  },

  PhysicalAddedRatio: {
    name: "Dano Físico",
    field: "dmg",
    element: "physical",
    percent: true,
    affix: false,
    main: ["sphere"],
    Summary: "Dano Físico",
  },

  FireAddedRatio: {
    name: "Dano Fogo",
    field: "dmg",
    element: "fire",
    percent: true,
    affix: false,
    main: ["sphere"],
    Summary: "Dano Fogo",
  },

  IceAddedRatio: {
    name: "Dano Gelo",
    field: "dmg",
    element: "ice",
    percent: true,
    affix: false,
    main: ["sphere"],
    Summary: "Dano Gelo",
  },

  ThunderAddedRatio: {
    name: "Dano Raio",
    field: "dmg",
    element: "lightning",
    percent: true,
    affix: false,
    main: ["sphere"],
    Summary: "Dano Raio",
  },

  WindAddedRatio: {
    name: "Dano Vento",
    field: "dmg",
    element: "wind",
    percent: true,
    affix: false,
    main: ["sphere"],
    Summary: "Dano Vento",
  },

  QuantumAddedRatio: {
    name: "Dano Quantum",
    field: "dmg",
    element: "quantum",
    percent: true,
    affix: false,
    main: ["sphere"],
    Summary: "Dano Quantum",
  },

  ImaginaryAddedRatio: {
    name: "Dano Imaginário",
    field: "dmg",
    element: "imaginary",
    percent: true,
    affix: false,
    main: ["sphere"],
    Summary: "Dano Imaginário",
  },
};

export const bobbiegoods = {};
