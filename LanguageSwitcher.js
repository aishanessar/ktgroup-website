/* ============================================================
   LanguageSwitcher.js — ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА (RU / KZ / EN)
   ============================================================
   Наследует Component.
   Особенность: этот блок живёт ВНУТРИ шапки, поэтому его запускает
   класс Header (а не App). Header при каждой своей перерисовке
   говорит переключателю: «вот твой новый элемент, нарисуй себя».

   Поведение:
     • клик по «RU ▾» — открыть/закрыть список языков;
     • клик по языку — сменить язык всего сайта;
     • клик мимо списка или клавиша Esc — закрыть список.
   ============================================================ */

// import — взять класс/данные из другого файла (это и есть ES6-модули)
import { Component } from '../core/Component.js';
import { icons } from '../data/icons.js';

export class LanguageSwitcher extends Component {

  constructor(root, languageManager) {
    // super(...) — вызвать конструктор РОДИТЕЛЯ (Component).
    // Обязательно первой строкой, как в Java.
    super(root, languageManager);

    this.isOpen = false;  // открыт ли сейчас выпадающий список

    // Эти обработчики вешаются на ВЕСЬ документ один раз (в конструкторе),
    // потому что документ не перерисовывается — иначе они бы дублировались.
    this.listenForOutsideClicks();
    this.listenForEscapeKey();
  }


  /* ---------- HTML ---------- */
  render() {
    const current = this.languageManager.currentLanguage;

    // .map() — пройти по массиву и для КАЖДОГО элемента создать что-то новое.
    // Здесь: для каждого кода языка создаём кнопку <li><button>…</button></li>.
    // .join('') — склеить массив строк в одну строку без разделителей.
    const options = this.languageManager.getLanguageCodes()
      .map((code) => `
        <li>
          <button
            class="lang-switcher__option ${code === current ? 'is-active' : ''}"
            type="button"
            data-lang="${code}"
          >${this.languageManager.getLabel(code)}</button>
        </li>`)
      .join('');

    /* ${ ... } внутри `...` — подстановка значения в строку (шаблонная строка).
       Условие ? A : B — «тернарный оператор»: если условие верно → A, иначе → B.
       data-lang="kz" — data-атрибут: своё «хранилище» информации прямо в HTML-теге.
       aria-* атрибуты — подсказки для экранных дикторов (незрячих посетителей). */
    return `
      <button
        class="lang-switcher__toggle"
        type="button"
        aria-haspopup="true"
        aria-expanded="${this.isOpen}"
        aria-label="${this.t('header.chooseLanguage')}"
      >
        ${this.languageManager.getLabel(current)}
        <span class="lang-switcher__chevron">${icons.chevronDown}</span>
      </button>
      <ul class="lang-switcher__list">
        ${options}
      </ul>
    `;
  }


  /* ---------- ОБРАБОТЧИКИ ДЛЯ ЭЛЕМЕНТОВ ВНУТРИ БЛОКА ----------
     Вызывается после каждой перерисовки (см. Component.update). */
  bindEvents() {
    this.syncOpenState();  // восстановить открыт/закрыт после перерисовки

    // querySelector — найти ПЕРВЫЙ элемент по CSS-селектору внутри блока
    const toggleButton = this.root.querySelector('.lang-switcher__toggle');

    // addEventListener('click', функция) — «когда кликнут, выполни функцию»
    toggleButton.addEventListener('click', () => this.setOpen(!this.isOpen));

    // querySelectorAll — найти ВСЕ подходящие элементы (кнопки языков)
    this.root.querySelectorAll('.lang-switcher__option').forEach((button) => {
      button.addEventListener('click', () => {
        this.setOpen(false);
        // button.dataset.lang — чтение data-lang="..." из HTML-тега
        this.languageManager.setLanguage(button.dataset.lang);
      });
    });
  }


  /* ---------- ОТКРЫТЬ / ЗАКРЫТЬ СПИСОК ---------- */
  setOpen(isOpen) {
    this.isOpen = isOpen;
    this.syncOpenState();
  }

  /* Привести HTML в соответствие с this.isOpen:
     classList.toggle('класс', true/false) — добавить класс при true, убрать при false.
     CSS (header.css) показывает список, когда у блока есть класс .is-open. */
  syncOpenState() {
    if (!this.root) {
      return;
    }
    this.root.classList.toggle('is-open', this.isOpen);

    const toggleButton = this.root.querySelector('.lang-switcher__toggle');
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', String(this.isOpen));
    }
  }


  /* ---------- ЗАКРЫТИЕ ПРИ КЛИКЕ МИМО ----------
     event.target — элемент, по которому кликнули.
     this.root.contains(элемент) — находится ли элемент внутри переключателя.
     Если клик был НЕ внутри переключателя — закрываем список. */
  listenForOutsideClicks() {
    document.addEventListener('click', (event) => {
      if (this.isOpen && this.root && !this.root.contains(event.target)) {
        this.setOpen(false);
      }
    });
  }

  /* ---------- ЗАКРЫТИЕ ПО КЛАВИШЕ ESC ---------- */
  listenForEscapeKey() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) {
        this.setOpen(false);
      }
    });
  }
}
