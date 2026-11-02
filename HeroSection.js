/* ============================================================
   HeroSection.js — ПЕРВЫЙ ЭКРАН
   ============================================================
   Наследует Component.
   Содержит: фото карьера справа, строку «Добыча • Производство …»,
   главный заголовок, описание и кнопку «Смотреть продукцию».
   Кнопка — ссылка на #products: при клике страница плавно
   прокручивается к блоку продукции (scroll-behavior в base.css).
   ============================================================ */

import { Component } from '../core/Component.js';
import { icons } from '../data/icons.js';

export class HeroSection extends Component {

  /* imageSrc — путь к фото для первого экрана */
  constructor(root, languageManager, imageSrc) {
    super(root, languageManager);
    this.imageSrc = imageSrc;
  }

  render() {
    /* fetchpriority="high" — подсказка браузеру: эту картинку грузить в первую очередь,
       она видна сразу при открытии сайта.
       alt="" + aria-hidden — фото декоративное, дикторам его описывать не нужно. */
    return `
      <div class="hero__media">
        <img
          class="hero__image"
          src="${this.imageSrc}"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
        >
      </div>
      <div class="hero__overlay"></div>

      <div class="container hero__content">
        <p class="hero__eyebrow">${this.t('hero.eyebrow')}</p>
        <h1 class="hero__title">${this.t('hero.title')}</h1>
        <p class="hero__text">${this.t('hero.text')}</p>
        <a class="button button--primary" href="#products">
          ${this.t('hero.button')}
          <span class="button__arrow">${icons.arrowRight}</span>
        </a>
      </div>
    `;
  }
}
