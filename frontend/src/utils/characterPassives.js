/**
 * characterPassives.js
 *
 * Mapa de passivas de conversão de status por personagem (charId da API).
 * Essas regras NÃO existem como dados estruturados na API — são codificadas
 * manualmente com base nas passivas de jogo de cada personagem.
 *
 * Para adicionar um novo personagem:
 * 1. Encontre o charId na API (ex: "1310" para Vaga-lume)
 * 2. Adicione uma entrada no objeto PASSIVE_MAP abaixo
 * 3. A função recebe `stats` com valores numéricos FINAIS
 *    { hp, atk, def, spd, crit_rate, crit_dmg, break, effect_hit, effect_res, energy, heal, dmg }
 *    Todos como números. O toFixed() é aplicado DEPOIS desta função.
 *
 * Fontes de referência: habilidades oficiais do jogo (HSR Wiki / fandom)
 */

const PASSIVE_MAP = {

  // ─── Vaga-lume / Firefly (SAM) ────────────────────────────────────────────
  // Eidolon 0 Passiva: Para cada 10 ATK acima de 1800, ganha +0.8% de Break Effect
  // (Sem cap explícito na passiva base)
  "1310": (stats) => {
    const excessAtk = Math.max(0, stats.atk - 1800);
    const breakBonus = Math.floor(excessAtk / 10) * 0.8;
    return { ...stats, break: stats.break + breakBonus };
  },

  // ─── Aventurine ─────────────────────────────────────────────────────────
  // Passiva: Para cada 100 DEF acima de 1600, ganha +2% de CRIT Rate (cap: +48%)
  "1304": (stats) => {
    const excessDef = Math.max(0, stats.def - 1600);
    const critBonus = Math.min(48, Math.floor(excessDef / 100) * 2);
    return { ...stats, crit_rate: stats.crit_rate + critBonus };
  },

  // ─── Cisne Negro / Black Swan ────────────────────────────────────────────
  // Passiva: DMG% += 60% × Effect Hit Rate (cap: +72%)
  // (Cada 1% de Effect Hit dá 0.6% de DMG)
  "1307": (stats) => {
    const dmgBonus = Math.min(72, stats.effect_hit * 0.6);
    return { ...stats, dmg: stats.dmg + dmgBonus };
  },

  // ─── Xueyi ──────────────────────────────────────────────────────────────
  // Passiva: DMG% += 100% × Break Effect (cap: +240%)
  "1214": (stats) => {
    const dmgBonus = Math.min(240, stats.break * 1.0);
    return { ...stats, dmg: stats.dmg + dmgBonus };
  },

  // ─── Boothill ───────────────────────────────────────────────────────────
  // Passiva A3: CRIT Rate += 10% do Break Effect (cap: +30%)
  // Passiva A5: CRIT DMG  += 50% do Break Effect (cap: +150%)
  "1315": (stats) => {
    const critRateBonus = Math.min(30, stats.break * 0.1);
    const critDmgBonus = Math.min(150, stats.break * 0.5);
    return {
      ...stats,
      crit_rate: stats.crit_rate + critRateBonus,
      crit_dmg: stats.crit_dmg + critDmgBonus,
    };
  },

  // ─── Gallagher ──────────────────────────────────────────────────────────
  // Passiva A6: Bônus de Cura += 50% do Break Effect (cap: +75%)
  "1301": (stats) => {
    const healBonus = Math.min(75, stats.break * 0.5);
    return { ...stats, heal: stats.heal + healBonus };
  },

  // ─── Lingsha ────────────────────────────────────────────────────────────
  // Passiva A4: ATK% += 25% do Break Effect (cap: +50%)
  // Passiva A6: Bônus de Cura += 10% fixo por passiva (cap: +20%)
  "1222": (stats) => {
    const atkPercentBonus = Math.min(50, stats.break * 0.25);
    const atkFlatEquiv = stats.atk * (atkPercentBonus / 100);
    const healBonus = Math.min(20, 10);
    return {
      ...stats,
      atk: Math.floor(stats.atk + atkFlatEquiv),
      heal: stats.heal + healBonus,
    };
  },

  // ─── Rappa ──────────────────────────────────────────────────────────────
  // Passiva A4: Break Effect += 0.5% por ponto de ATK acima de 2400 (cap: +80%)
  "1317": (stats) => {
    const excessAtk = Math.max(0, stats.atk - 2400);
    const breakBonus = Math.min(80, excessAtk * 0.005);
    return { ...stats, break: stats.break + breakBonus };
  },

  // ─── Fugue (Tingyun Chama) ───────────────────────────────────────────────
  // Passiva A4: Quando aliado com "Foxian Prayer" causa Break, Fugue ganha +6% de Break Effect
  //             (esse é um buff de combate - representamos como bônus estático de build)
  // Passiva base: Break Effect aumenta a duração do "Torrid Scorch"
  // → Sem conversão direta aplicável à calculadora de build estática

  // ─── Jade ───────────────────────────────────────────────────────────────
  // Passiva Talent: Ganha stacks de "Pawned Asset" que dão CRIT DMG += 3.2% por stack (cap: 5 stacks = +16%)
  // Isso é um buff de combate (stacks geradas em batalha), não conversão de stat → stat.
  // → Sem conversão direta aplicável em build estática

  // ─── Mydei ──────────────────────────────────────────────────────────────
  // Passiva: Dano escala com HP Máximo (não CRIT Rate/DMG bonus passivo de build)
  // → Sem conversão direta de stat → stat aplicável à calculadora

  // ─── Yanqing ────────────────────────────────────────────────────────────
  // Passiva "One With the Sword" (com Soulsteel Sync ativo): CRIT Rate +15%, CRIT DMG +30%
  // Isso é condicional de estado de batalha, mas é basicamente sempre ativo em rotação normal.
  // Representamos como bônus de build assumindo Soulsteel Sync ativo.
  "1209": (stats) => {
    return {
      ...stats,
      crit_rate: stats.crit_rate + 15,
      crit_dmg: stats.crit_dmg + 30,
    };
  },

  // ─── Jingliu ────────────────────────────────────────────────────────────
  // Passiva (Transmigration): CRIT Rate += 50% enquanto em Transmigration
  // Estado sempre ativo em rotação real — representamos como bônus de build
  "1212": (stats) => {
    return { ...stats, crit_rate: stats.crit_rate + 50 };
  },

  // ─── Dan Heng – Embebidor Lunae ─────────────────────────────────────────
  // Passiva A4: Ao usar Skill com Imaginary Whirl máximo, CRIT DMG += 24% por turno (até 3)
  // Condicional, assumimos estado de combate máximo
  "1213": (stats) => {
    return { ...stats, crit_dmg: stats.crit_dmg + 24 };
  },

  // ─── Fu Xuan ───────────────────────────────────────────────────────────
  // Passiva A4: HP atual de aliados convertido parcialmente → CRIT Rate e CRIT DMG
  // Talent passivo: CRIT Rate da equipe += 12% de Fu Xuan (buff de equipe)
  // Para build individual: Passiva própria
  // Passiva A6: CRIT Rate += 12%, CRIT DMG += 30% da própria Fu Xuan enquanto Matrix of Prescience ativo
  "1208": (stats) => {
    return {
      ...stats,
      crit_rate: stats.crit_rate + 12,
      crit_dmg: stats.crit_dmg + 30,
    };
  },

  // ─── Acheron ────────────────────────────────────────────────────────────
  // Passiva A4: Se não houver suporte de mesmo tipo, CRIT DMG += 18%
  // Passiva A6: Nihility aliados (0-2) → CRIT Rate: +18% por Nihility sem buffer de mesmo tipo
  // Assumimos cenário padrão (2 Nihility no time): +36% CRIT Rate + 18% CRIT DMG
  "1308": (stats) => {
    return {
      ...stats,
      crit_rate: stats.crit_rate + 36,
      crit_dmg: stats.crit_dmg + 18,
    };
  },

  // ─── Ruan Mei ────────────────────────────────────────────────────────────
  // Passiva A4: SPD += 10% do Break Effect atual (sem cap explícito)
  // A4 real: "When Ruan Mei's Break Effect reaches 120%, SPD increases by 10% of Break Effect"
  "1303": (stats) => {
    if (stats.break >= 120) {
      const spdBonus = stats.spd * (stats.break * 0.001); // 0.1% SPD por 1% Break Effect → 10% × break/100
      return { ...stats, spd: stats.spd + spdBonus };
    }
    return stats;
  },

  // ─── Feixiao ─────────────────────────────────────────────────────────────
  // Passiva A4: CRIT DMG += 24% (fixa após condição de primeiro turno)
  // Passiva A6: quando lança Ultimate com 12 Aureus, fica imune e recebe +60% de CRIT DMG adicional
  // Representamos a passiva A4 como bônus base de build
  "1220": (stats) => {
    return { ...stats, crit_dmg: stats.crit_dmg + 24 };
  },

  // ─── Seele ──────────────────────────────────────────────────────────────
  // Passiva A4: Quando Seele usa habilidade enquanto em Resurgence: DMG aumenta 80%
  // Isso é um bônus de combate condicional — não conversão de stat → stat aplicável no builder
  // → Sem passiva de conversão aplicável

  // ─── Argenti ─────────────────────────────────────────────────────────────
  // Passiva Talent: CRIT Rate += 2.5% por stack de Apotheosis (max 10 stacks = +25%)
  // Assumimos rotação com máximo de stacks
  "1302": (stats) => {
    return { ...stats, crit_rate: stats.crit_rate + 25 };
  },

  // ─── Blade ─────────────────────────────────────────────────────────────
  // Passiva A4: HP Máximo → bônus de CRIT Rate
  // "Increases CRIT Rate by an amount equal to 20% of HP lost percentage" (condicional em batalha)
  // Passiva A6: ATK aumenta em 20% do HP máximo como flat — isso é conversão HP → ATK
  // → Sem conversão direta que se aplique no builder estático de forma relevante

  // ─── Dr. Ratio ──────────────────────────────────────────────────────────
  // Passiva A4: CRIT Rate += 2.5% por debuff no alvo (max 4 debuffs = +10%)
  // Passiva A6: CRIT DMG += 5% por debuff no alvo (max 4 = +20%)
  // Assumimos rotação com 4 debuffs no alvo (cenário ideal)
  "1305": (stats) => {
    return {
      ...stats,
      crit_rate: stats.crit_rate + 10,
      crit_dmg: stats.crit_dmg + 20,
    };
  },
};

/**
 * Aplica as passivas de conversão de status do personagem selecionado.
 *
 * @param {Object} stats   - Objeto de status com valores numéricos finais
 * @param {string} charId  - ID do personagem conforme a API (ex: "1310")
 * @returns {Object}       - Novo objeto de status com as conversões aplicadas
 */
export function applyPassiveConversions(stats, charId) {
  if (!charId || !PASSIVE_MAP[charId]) return stats;
  return PASSIVE_MAP[charId](stats);
}
