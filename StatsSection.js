/* ============================================================
   StatsSection.js — БЛОК С ЦИФРАМИ
   ============================================================
   Наследует Component.
   • Рисует 4 цифры (объекты StatItem) на тёмном фоне с горами.
   • Когда посетитель докручивает до блока, цифры «досчитывают»
     от 0 до нужного значения (класс CountUpAnimation). Один раз.

   Продвинутая часть — IntersectionObserver («наблюдатель пересечения»):
     встроенный в браузер инструмент, который сообщает, когда элемент
     ПОЯВИЛСЯ на экране. Без него пришлось бы на каждую прокрутку
     вручную вычислять координаты блока.
   ============================================================ */

import { Component } from '../core/Component.js';
import { StatItem } from './StatItem.js';
import { CountUpAnimation } from '../utils/CountUpAnimation.js';

export class StatsSection extends Component {

  /* Какая часть блока должна стать видимой, чтобы запустить анимацию: 0.4 = 40% */
  static VISIBILITY_THRESHOLD = 0.4;

  /* stats           — массив из data/stats.js
     backgroundSrc   — путь к фоновому фото */
  constructor(root, languageManager, stats, backgroundSrc) {
    super(root, languageManager);
    this.items = stats.map((stat) => new StatItem(stat, languageManager));
    this.backgroundSrc = backgroundSrc;
    this.hasAnimated = false;  // анимация уже была? (чтобы не повторять её)
  }

  render() {
    // До анимации показываем нули, после — итоговые числа
    // (важно при смене языка: блок перерисуется, и числа не должны «обнулиться»)
    const itemsHtml = this.items
      .map((item) => item.render(this.hasAnimated ? item.stat.value : 0))
      .join('');

    return `
      <img class="stats__bg" src="${this.backgroundSrc}" alt="" aria-hidden="true" loading="lazy">
      <div class="stats__overlay"></div>
      <div class="container">
        <h2 class="visually-hidden">${this.t('stats.heading')}</h2>
        <ul class="stats__list">${itemsHtml}</ul>
      </div>
    `;
  }

  /* Одноразовая настройка: начинаем «наблюдать» за блоком */
  onMount() {
    // Старые браузеры без IntersectionObserver: просто запускаем анимацию сразу
    if (!('IntersectionObserver' in window)) {
      this.startAnimation();
      return;
    }

    /* new IntersectionObserver(функция, настройки)
       Функция вызывается, когда видимость блока меняется.
       entries — список наблюдаемых элементов (у нас один — сама секция).
       entry.isIntersecting — true, если блок сейчас виден на экране. */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startAnimation();
          observer.disconnect();  // перестаём наблюдать — анимация нужна один раз
        }
      });
    }, { threshold: StatsSection.VISIBILITY_THRESHOLD });

    observer.observe(this.root);  // начать наблюдение за нашей секцией
  }

  /* Запустить анимацию каждой цифры */
  startAnimation() {
    if (this.hasAnimated) {
      return;
    }
    this.hasAnimated = true;

    this.items.forEach((item) => {
      // Находим элемент числа по метке data-stat-id
      const element = this.root.querySelector(`[data-stat-id="${item.stat.id}"]`);

      // (value) => item.format(value) — передаём «как форматировать число» в анимацию
      const animation = new CountUpAnimation(element, item.stat.value, (value) => item.format(value));
      animation.start();
    });
  }
}
