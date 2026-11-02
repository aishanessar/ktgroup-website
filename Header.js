/* ============================================================
   Header.js — ШАПКА САЙТА
   ============================================================
   Наследует Component.
   Содержит: логотип, главное меню, переключатель языка, кнопку-«бургер».

   Поведение:
     • прокрутили страницу вниз → шапка становится тёмной (класс .header--scrolled);
     • на телефоне меню открывается кнопкой-«бургером» (класс .header--menu-open);
     • клик по пункту меню на телефоне → меню закрывается.

   КОМПОЗИЦИЯ («объект внутри объекта»):
     Шапка СОДЕРЖИТ объект LanguageSwitcher и управляет им.
     Это второй важный приём ООП наряду с наследованием.
   ============================================================ */

import { Component } from '../core/Component.js';
import { LanguageSwitcher } from './LanguageSwitcher.js';

export class Header extends Component {

  /* С какой прокрутки (в пикселях) шапка становится тёмной */
  static SCROLL_THRESHOLD = 20;

  /* navigationItems — пункты меню из data/navigation.js
     logoSrc         — путь к файлу логотипа */
  constructor(root, languageManager, navigationItems, logoSrc) {
    super(root, languageManager);
    this.navigationItems = navigationItems;
    this.logoSrc = logoSrc;
    this.isMenuOpen = false;  // открыто ли мобильное меню

    // Создаём переключатель языка. Элемента для него пока нет (null) —
    // он появится, когда шапка нарисует себя (см. bindEvents).
    this.languageSwitcher = new LanguageSwitcher(null, languageManager);
  }


  /* ---------- HTML ---------- */
  render() {
    // Пункты меню: для каждого объекта из navigation.js — тег <li> со ссылкой
    const menuItems = this.navigationItems
      .map((item) => `
        <li>
          <a class="header__link" href="${item.href}">${this.t(item.labelKey)}</a>
        </li>`)
      .join('');

    return `
      <div class="container header__inner">

        <!-- Логотип: ссылка наверх страницы -->
        <a class="header__logo" href="#" aria-label="${this.t('header.homeLink')}">
          <img src="${this.logoSrc}" alt="KT Group — Karavan Temir Group" width="342" height="135">
        </a>

        <!-- Главное меню -->
        <nav class="header__nav" id="main-nav">
          <ul class="header__menu">${menuItems}</ul>
        </nav>

        <!-- Правая часть -->
        <div class="header__actions">
          <!-- Пустой контейнер: сюда нарисует себя LanguageSwitcher -->
          <div class="lang-switcher" data-role="lang-switcher"></div>

          <!-- Кнопка-«бургер» (видна только на телефоне/планшете).
               aria-controls говорит дикторам, каким элементом управляет кнопка -->
          <button
            class="header__burger"
            type="button"
            aria-controls="main-nav"
            aria-expanded="${this.isMenuOpen}"
            aria-label="${this.t('header.toggleMenu')}"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
  }


  /* ---------- ОБРАБОТЧИКИ (после каждой перерисовки) ---------- */
  bindEvents() {
    // 1. Переключатель языка: даём ему его новый элемент и просим нарисовать себя
    const switcherElement = this.root.querySelector('[data-role="lang-switcher"]');
    this.languageSwitcher.setRoot(switcherElement);
    this.languageSwitcher.update();

    // 2. Бургер: открыть/закрыть меню
    const burger = this.root.querySelector('.header__burger');
    burger.addEventListener('click', () => this.setMenuOpen(!this.isMenuOpen));

    // 3. Клик по любому пункту меню закрывает мобильное меню
    this.root.querySelectorAll('.header__link').forEach((link) => {
      link.addEventListener('click', () => this.setMenuOpen(false));
    });
  }


  /* ---------- ОДНОРАЗОВАЯ НАСТРОЙКА ----------
     Обработчик прокрутки вешается на всё окно (window) ровно один раз. */
  onMount() {
    this.updateScrolledState();  // проверить сразу (если страницу открыли уже прокрученной)

    // { passive: true } — обещаем браузеру, что не будем отменять прокрутку.
    // Так браузер прокручивает плавнее, не дожидаясь нашего кода.
    window.addEventListener('scroll', () => this.updateScrolledState(), { passive: true });
  }


  /* ---------- ТЁМНАЯ ШАПКА ПРИ ПРОКРУТКЕ ----------
     window.scrollY — на сколько пикселей прокручена страница от верха. */
  updateScrolledState() {
    const isScrolled = window.scrollY > Header.SCROLL_THRESHOLD;
    this.root.classList.toggle('header--scrolled', isScrolled);
  }


  /* ---------- МОБИЛЬНОЕ МЕНЮ ---------- */
  setMenuOpen(isOpen) {
    this.isMenuOpen = isOpen;

    // Класс на самой шапке → CSS показывает/прячет меню и рисует крестик
    this.root.classList.toggle('header--menu-open', isOpen);

    const burger = this.root.querySelector('.header__burger');
    burger.setAttribute('aria-expanded', String(isOpen));
  }
}
