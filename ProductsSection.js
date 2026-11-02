/* ============================================================
   ProductsSection.js — БЛОК «НАША ПРОДУКЦИЯ»
   ============================================================
   Наследует Component.
   • Создаёт объект ProductCard для каждого камня из data/products.js.
   • Сначала видны камни с featured: true (4 штуки).
   • Кнопка «Смотреть всю продукцию» раскрывает остальные,
     повторное нажатие («Свернуть») — снова прячет их.
   ============================================================ */

import { Component } from '../core/Component.js';
import { ProductCard } from './ProductCard.js';
import { icons } from '../data/icons.js';

export class ProductsSection extends Component {

  /* products — массив из data/products.js */
  constructor(root, languageManager, products) {
    super(root, languageManager);
    this.cards = products.map((product) => new ProductCard(product, languageManager));
    this.isExpanded = false;  // раскрыт ли полный список
  }

  /* Есть ли вообще скрытые камни. Если нет — кнопку показывать незачем.
     .some() — «есть ли ХОТЯ БЫ ОДИН элемент, для которого условие верно» */
  hasExtraCards() {
    return this.cards.some((card) => card.isExtra());
  }

  /* Текст кнопки зависит от состояния: «Смотреть всю продукцию» или «Свернуть» */
  getToggleLabel() {
    return this.isExpanded ? this.t('products.showLess') : this.t('products.showAll');
  }

  /* HTML кнопки (или пустая строка, если скрытых камней нет) */
  renderToggle() {
    if (!this.hasExtraCards()) {
      return '';
    }
    return `
      <button
        class="products__toggle"
        type="button"
        aria-controls="products-grid"
        aria-expanded="${this.isExpanded}"
      >
        <span class="products__toggle-label">${this.getToggleLabel()}</span>
        <span class="products__toggle-icon">${icons.arrowRight}</span>
      </button>
    `;
  }

  render() {
    const cardsHtml = this.cards.map((card) => card.render()).join('');
    const expandedClass = this.isExpanded ? 'is-expanded' : '';

    return `
      <div class="container">
        <div class="products__head">
          <h2 class="section-title">${this.t('products.title')}</h2>
          ${this.renderToggle()}
        </div>
        <ul class="products__grid ${expandedClass}" id="products-grid">
          ${cardsHtml}
        </ul>
      </div>
    `;
  }

  bindEvents() {
    const toggleButton = this.root.querySelector('.products__toggle');

    // ?. — «опциональная цепочка»: если кнопки нет (null), строка просто пропускается без ошибки
    toggleButton?.addEventListener('click', () => this.toggleExpanded());
  }

  /* Раскрыть/свернуть список.
     Мы НЕ перерисовываем весь блок, а точечно меняем класс сетки и текст кнопки:
     так кнопка не теряет фокус, а уже видимые карточки не мигают. */
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;

    const grid = this.root.querySelector('.products__grid');
    const toggleButton = this.root.querySelector('.products__toggle');
    const label = this.root.querySelector('.products__toggle-label');

    grid.classList.toggle('is-expanded', this.isExpanded);   // CSS покажет/спрячет доп. карточки
    toggleButton.setAttribute('aria-expanded', String(this.isExpanded));
    label.textContent = this.getToggleLabel();               // textContent — заменить только текст
  }
}
