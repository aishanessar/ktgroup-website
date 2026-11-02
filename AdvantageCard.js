/* ============================================================
   AdvantageCard.js — ОДНА КАРТОЧКА-ПРЕИМУЩЕСТВО (иконка + заголовок + текст)
   ============================================================
   Это НЕ блок страницы, а «кирпичик» внутри блока AdvantagesSection,
   поэтому он НЕ наследует Component: у него нет своего места на странице,
   он только возвращает кусочек HTML, который вставит родительский блок.
   ============================================================ */

import { icons } from '../data/icons.js';

export class AdvantageCard {

  /* advantage       — один объект из data/advantages.js
     languageManager — для выбора текста на текущем языке */
  constructor(advantage, languageManager) {
    this.advantage = advantage;
    this.languageManager = languageManager;
  }

  /* Вернуть HTML карточки.
     icons[this.advantage.icon] — взять иконку по имени: icons['quarry'] то же, что icons.quarry */
  render() {
    const { icon, title, text } = this.advantage;
    // ↑ «Деструктуризация»: короткая запись трёх строк
    //   const icon = this.advantage.icon; const title = …; const text = …;

    return `
      <li class="advantage-card">
        <span class="advantage-card__icon">${icons[icon]}</span>
        <h3 class="advantage-card__title">${this.languageManager.pick(title)}</h3>
        <p class="advantage-card__text">${this.languageManager.pick(text)}</p>
      </li>
    `;
  }
}
