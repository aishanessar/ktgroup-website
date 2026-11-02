/* ============================================================
   AdvantagesSection.js — БЛОК «4 ПРЕИМУЩЕСТВА»
   ============================================================
   Наследует Component.
   Для каждого преимущества из data/advantages.js создаёт объект
   AdvantageCard и собирает их HTML в одну сетку.
   ============================================================ */

import { Component } from '../core/Component.js';
import { AdvantageCard } from './AdvantageCard.js';

export class AdvantagesSection extends Component {

  /* advantages — массив из data/advantages.js */
  constructor(root, languageManager, advantages) {
    super(root, languageManager);

    // Сразу превращаем «сырые» данные в объекты-карточки.
    // new AdvantageCard(...) — создание объекта класса (как в Java).
    this.cards = advantages.map((advantage) => new AdvantageCard(advantage, languageManager));
  }

  render() {
    // Каждая карточка рисует себя сама; мы только склеиваем результат
    const cardsHtml = this.cards.map((card) => card.render()).join('');

    // Заголовок h2 скрыт визуально (в макете его нет), но нужен дикторам и поисковикам
    return `
      <div class="container">
        <h2 class="visually-hidden">${this.t('advantages.heading')}</h2>
        <ul class="advantages__list">${cardsHtml}</ul>
      </div>
    `;
  }
}
