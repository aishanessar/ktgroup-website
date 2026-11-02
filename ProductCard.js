/* ============================================================
   ProductCard.js — ОДНА КАРТОЧКА КАМНЯ
   ============================================================
   «Кирпичик» внутри блока ProductsSection (НЕ наследует Component).
   Показывает: фото текстуры, название, нижнюю строку
   «вид камня · регион» и стрелку.
   ============================================================ */

import { icons } from '../data/icons.js';

export class ProductCard {

  /* product — один объект из data/products.js */
  constructor(product, languageManager) {
    this.product = product;
    this.languageManager = languageManager;
  }

  /* Дополнительная ли это карточка (скрыта до нажатия «Смотреть всю продукцию») */
  isExtra() {
    return !this.product.featured;  // ! — «НЕ»: true превращается в false и наоборот
  }

  /* Нижняя строка карточки: «Габбро · Алматинская обл.»
     Если вид камня не указан (type: null) — только регион: «Жетысуская обл.» */
  getMetaText() {
    const lm = this.languageManager;
    const type = lm.pick(this.product.type);                  // '' если type = null
    const region = lm.translate(`region.${this.product.region}`); // 'region.almaty' и т.п.

    // [type, region] — массив из двух строк.
    // .filter(Boolean) — выбросить пустые строки (если вида нет).
    // .join(' · ')     — склеить оставшиеся через « · ».
    return [type, region].filter(Boolean).join(' · ');
  }

  render() {
    const name = this.languageManager.pick(this.product.name);
    const extraClass = this.isExtra() ? 'products__item--extra' : '';

    /* loading="lazy" — «ленивая» загрузка: браузер скачает фото, только когда
       карточка приблизится к экрану. Страница открывается быстрее.
       width/height — исходные размеры фото: браузер заранее резервирует место,
       и страница не «прыгает» во время загрузки. */
    return `
      <li class="products__item ${extraClass}">
        <a class="product-card" href="${this.product.href}">
          <img
            class="product-card__image"
            src="${this.product.image}"
            alt="${name}"
            loading="lazy"
            width="900"
            height="600"
          >
          <div class="product-card__shade"></div>
          <div class="product-card__body">
            <h3 class="product-card__title">${name}</h3>
            <div class="product-card__footer">
              <span class="product-card__meta">${this.getMetaText()}</span>
              <span class="product-card__arrow">${icons.arrowRight}</span>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}
