/* ============================================================
   App.js — ГЛАВНЫЙ КЛАСС ПРИЛОЖЕНИЯ («дирижёр»)
   ============================================================
   Собирает сайт из частей:
     1. создаёт ОДИН LanguageManager для всего сайта;
     2. создаёт все блоки страницы и передаёт им их данные;
     3. запускает каждый блок (mount);
     4. обновляет заголовок вкладки и язык страницы при смене языка.

   Чтобы добавить на страницу новый блок:
     1. Создайте класс в js/components (наследник Component).
     2. Добавьте пустой контейнер <section id="..."> в index.html.
     3. Импортируйте класс здесь и добавьте его в список this.components.
   ============================================================ */

// Ядро
import { LanguageManager } from './LanguageManager.js';

// Блоки страницы
import { Header } from '../components/Header.js';
import { HeroSection } from '../components/HeroSection.js';
import { AdvantagesSection } from '../components/AdvantagesSection.js';
import { ProductsSection } from '../components/ProductsSection.js';
import { StatsSection } from '../components/StatsSection.js';
import { Footer } from '../components/Footer.js';

// Данные
import { translations } from '../data/translations.js';
import { navigation } from '../data/navigation.js';
import { advantages } from '../data/advantages.js';
import { products } from '../data/products.js';
import { stats } from '../data/stats.js';
import { footerColumns, contacts } from '../data/footer.js';

export class App {

  /* Пути к общим картинкам — в одном месте, чтобы легко заменить */
  static IMAGES = {
    logo: 'images/logo/kt-group-logo.webp',
    hero: 'images/hero/quarry-blocks.webp',
  };

  constructor() {
    // Один менеджер языков на весь сайт; язык по умолчанию — русский
    this.languageManager = new LanguageManager(translations, 'ru');
    const lm = this.languageManager;  // короткое имя для строк ниже

    // Все блоки страницы — в порядке сверху вниз.
    // Каждому передаём: где рисовать ('#id'), менеджер языков и СВОИ данные.
    this.components = [
      new Header('#site-header', lm, navigation, App.IMAGES.logo),
      new HeroSection('#hero', lm, App.IMAGES.hero),
      new AdvantagesSection('#advantages', lm, advantages),
      new ProductsSection('#products', lm, products),
      new StatsSection('#stats', lm, stats, App.IMAGES.hero),
      new Footer('#site-footer', lm, footerColumns, contacts, App.IMAGES.logo),
    ];
  }

  /* Запуск сайта */
  init() {
    // ПОЛИМОРФИЗМ: у всех блоков есть метод mount() (унаследован от Component),
    // но каждый внутри вызывает СВОЙ render(). App не важно, какой это блок.
    this.components.forEach((component) => component.mount());

    // Заголовок вкладки и <html lang> — сразу и при каждой смене языка
    this.updateDocumentLanguage();
    this.languageManager.subscribe(() => this.updateDocumentLanguage());
  }

  /* Обновить язык самой страницы:
       • <html lang="..."> — важно для поисковиков и экранных дикторов;
       • document.title    — текст во вкладке браузера. */
  updateDocumentLanguage() {
    document.documentElement.lang = this.languageManager.getHtmlLang();
    document.title = this.languageManager.translate('page.title');
  }
}
