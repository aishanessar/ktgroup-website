/* ============================================================
   translations.js — СЛОВАРЬ ИНТЕРФЕЙСА на трёх языках
   ============================================================
   Здесь короткие тексты интерфейса: меню, кнопки, заголовки.
   Как устроено:
     'ключ': { ru: 'текст', kz: 'мәтін', en: 'text' }
   Класс LanguageManager по ключу находит текст на текущем языке:
     languageManager.translate('nav.products') → 'Продукция' (если язык RU)

   ⚠️ Казахские тексты нужно проверить носителю языка перед запуском сайта.

   Как добавить новый текст:
     1. Добавьте строку с новым ключом и тремя переводами.
     2. В классе-компоненте вызовите this.t('ваш.ключ').
   ============================================================ */

// export const — «отдать наружу» константу, чтобы другие файлы могли её импортировать
export const translations = {

  /* ---------- Страница ---------- */
  'page.title': {
    ru: 'Karavan Temir Group — природный камень',
    kz: 'Karavan Temir Group — табиғи тас',
    en: 'Karavan Temir Group — natural stone',
  },

  /* ---------- Меню ---------- */
  'nav.about':      { ru: 'О компании',   kz: 'Компания туралы', en: 'About' },
  'nav.products':   { ru: 'Продукция',    kz: 'Өнімдер',         en: 'Products' },
  'nav.projects':   { ru: 'Проекты',      kz: 'Жобалар',         en: 'Projects' },
  'nav.production': { ru: 'Производство', kz: 'Өндіріс',         en: 'Production' },
  'nav.quality':    { ru: 'Качество',     kz: 'Сапа',            en: 'Quality' },
  'nav.contacts':   { ru: 'Контакты',     kz: 'Байланыс',        en: 'Contacts' },

  /* ---------- Шапка: подписи для экранных дикторов (незрячих посетителей) ---------- */
  'header.toggleMenu':     { ru: 'Открыть меню',  kz: 'Мәзірді ашу',   en: 'Open menu' },
  'header.chooseLanguage': { ru: 'Выбрать язык',  kz: 'Тілді таңдау',  en: 'Choose language' },
  'header.homeLink':       { ru: 'На главную',    kz: 'Басты бетке',   en: 'Home' },

  /* ---------- Первый экран ---------- */
  'hero.eyebrow': {
    ru: 'Добыча • Производство • Обработка • Поставка',
    kz: 'Кен өндіру • Өндіріс • Өңдеу • Жеткізу',
    en: 'Quarrying • Production • Processing • Delivery',
  },
  'hero.title': {
    // &nbsp; — «неразрывный пробел»: предлог «в» не останется один в конце строки
    ru: 'Природный камень в&nbsp;основе значимых проектов',
    kz: 'Маңызды жобалардың негізіндегі табиғи тас',
    en: 'Natural stone at the heart of landmark projects',
  },
  'hero.text': {
    ru: 'Karavan Temir Group добывает и обрабатывает природный камень — гранит и габбро — для государственных, общественных и частных объектов по всему Казахстану.',
    kz: 'Karavan Temir Group бүкіл Қазақстан бойынша мемлекеттік, қоғамдық және жеке нысандар үшін табиғи тасты — гранит пен габброны — өндіреді және өңдейді.',
    en: 'Karavan Temir Group quarries and processes natural stone — granite and gabbro — for public, civic and private projects across Kazakhstan.',
  },
  'hero.button': { ru: 'Смотреть продукцию', kz: 'Өнімдерді қарау', en: 'View products' },

  /* ---------- Преимущества ---------- */
  'advantages.heading': { ru: 'Наши преимущества', kz: 'Біздің артықшылықтарымыз', en: 'Why choose us' },

  /* ---------- Продукция ---------- */
  'products.title':    { ru: 'Наша продукция',         kz: 'Біздің өнімдер',           en: 'Our products' },
  'products.showAll':  { ru: 'Смотреть всю продукцию', kz: 'Барлық өнімдерді қарау',   en: 'View all products' },
  'products.showLess': { ru: 'Свернуть',               kz: 'Жасыру',                   en: 'Show less' },

  /* Регионы добычи (используются в карточках камней) */
  'region.almaty':  { ru: 'Алматинская обл.', kz: 'Алматы облысы', en: 'Almaty Region' },
  'region.zhetysu': { ru: 'Жетысуская обл.',  kz: 'Жетісу облысы', en: 'Zhetysu Region' },

  /* ---------- Цифры ---------- */
  'stats.heading': { ru: 'Компания в цифрах', kz: 'Компания сандармен', en: 'Company in numbers' },

  /* ---------- Подвал ---------- */
  'footer.description': {
    ru: 'Добыча и обработка природного камня — гранит и габбро',
    kz: 'Табиғи тасты өндіру және өңдеу — гранит пен габбро',
    en: 'Quarrying and processing of natural stone — granite and gabbro',
  },
  'footer.rights': {
    ru: 'Все права защищены.',
    kz: 'Барлық құқықтар қорғалған.',
    en: 'All rights reserved.',
  },
};
