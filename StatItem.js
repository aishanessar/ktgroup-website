/* ============================================================
   StatItem.js — ОДНА ЦИФРА С ПОДПИСЬЮ (например, «19 — лет на рынке»)
   ============================================================
   «Кирпичик» внутри блока StatsSection (НЕ наследует Component).
   ============================================================ */

export class StatItem {

  /* stat — один объект из data/stats.js */
  constructor(stat, languageManager) {
    this.stat = stat;
    this.languageManager = languageManager;
  }

  /* Превратить число в текст по правилам текущего языка (3.6 → '3,6' или '3.6').
     Этот метод передаётся в CountUpAnimation как formatter. */
  format(value) {
    return this.languageManager.formatNumber(value, this.stat.decimals);
  }

  /* HTML цифры.
     displayValue — какое число показать СЕЙЧАС: 0 (до анимации) или итоговое (после).
     data-stat-id — метка, по которой StatsSection потом найдёт этот элемент для анимации. */
  render(displayValue) {
    return `
      <li class="stat-item">
        <span class="stat-item__value" data-stat-id="${this.stat.id}">${this.format(displayValue)}</span>
        <span class="stat-item__label">${this.languageManager.pick(this.stat.label)}</span>
      </li>
    `;
  }
}
