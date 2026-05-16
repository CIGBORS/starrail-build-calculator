/**
 * FuncStatus.js
 * Funções modulares para o cálculo de cada atributo individual do personagem.
 */

export function calcHp(base, percentBonus, flatBonus) {
  return Math.floor(base * (1 + percentBonus / 100) + flatBonus);
}

export function calcAtk(base, percentBonus, flatBonus) {
  return Math.floor(base * (1 + percentBonus / 100) + flatBonus);
}

export function calcDef(base, percentBonus, flatBonus) {
  return Math.floor(base * (1 + percentBonus / 100) + flatBonus);
}

export function calcSpd(base, percentBonus, flatBonus) {
  return base * (1 + percentBonus / 100) + flatBonus;
}

export function calcCritRate(base, percentBonus) {
  return base * 100 + percentBonus;
}

export function calcCritDmg(base, percentBonus) {
  return base * 100 + percentBonus;
}

export function calcBreakEffect(percentBonus) {
  return percentBonus;
}

export function calcEffectHitRate(percentBonus) {
  return percentBonus;
}

export function calcEffectRes(percentBonus) {
  return percentBonus;
}

export function calcEnergyRegen(percentBonus) {
  return 100 + percentBonus;
}

export function calcHealBonus(percentBonus) {
  return percentBonus;
}

export function calcElementalDmg(specificBonus, allDmgBonus) {
  return specificBonus + allDmgBonus;
}
