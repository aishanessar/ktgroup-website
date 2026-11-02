/* ============================================================
   LanguageManager.js — КЛАСС «МЕНЕДЖЕР ЯЗЫКОВ»
   ============================================================
   Отвечает за всё, что связано с языками:
     • хранит текущий язык (ru / kz / en);
     • переводит тексты по ключу из словаря;
     • запоминает выбор посетителя (при следующем визите язык сохранится);
     • сообщает всем блокам страницы, что язык поменялся.

   ПАТТЕРН «НАБЛЮДАТЕЛЬ» (Observer):
     Блоки страницы «подписываются» на менеджер (subscribe).
     Когда язык меняется, менеджер «оповещает» всех подписчиков (notify),
     и каждый блок перерисовывает себя на новом языке.
     Аналогия: подписка на канал — вышло новое видео, всем подписчикам пришло уведомление.
   ============================================================ */

export class LanguageManager {

  /* ---------- СТАТИЧЕСКИЕ ПОЛЯ ----------
     static — поле принадлежит САМОМУ КЛАССУ, а не объекту (как static в Java).
     Обращение: LanguageManager.LANGUAGES */

  /* Поддерживаемые языки:
       label    — что показывается в переключателе
       htmlLang — официальный код языка для тега <html lang="...">
                  (у казахского это 'kk', а не 'kz')
       locale   — код для форматирования чисел (3,6 или 3.6).
                  Для казахского берём 'ru-RU': правила записи чисел те же (запятая),
                  а некоторые браузеры не знают 'kk-KZ' и ставят точку. */
  static LANGUAGES = {
    ru: { label: 'RU', htmlLang: 'ru', locale: 'ru-RU' },
    kz: { label: 'KZ', htmlLang: 'kk', locale: 'ru-RU' },
    en: { label: 'EN', htmlLang: 'en', locale: 'en-US' },
  };

  /* Под каким именем выбор языка сохраняется в браузере */
  static STORAGE_KEY = 'ktg-language';


  /* ---------- КОНСТРУКТОР ----------
     Вызывается при создании объекта: new LanguageManager(translations, 'ru')
       dictionary      — словарь из translations.js
       defaultLanguage — язык по умолчанию */
  constructor(dictionary, defaultLanguage = 'ru') {
    this.dictionary = dictionary;
    this.listeners = [];  // список подписчиков (функций), которых нужно оповестить при смене языка

    // ?? — «оператор нулевого слияния»: если слева null/undefined, берётся значение справа.
    // То есть: «сохранённый язык, а если его нет — язык по умолчанию».
    this.currentLanguage = this.loadSavedLanguage() ?? defaultLanguage;
  }


  /* ---------- ПОЛУЧЕНИЕ ИНФОРМАЦИИ ---------- */

  /* Список кодов языков: ['ru', 'kz', 'en'].
     Object.keys(объект) возвращает массив имён его полей. */
  getLanguageCodes() {
    return Object.keys(LanguageManager.LANGUAGES);
  }

  /* Подпись языка для переключателя: 'kz' → 'KZ' */
  getLabel(code) {
    return LanguageManager.LANGUAGES[code].label;
  }

  /* Код для <html lang="..."> текущего языка */
  getHtmlLang() {
    return LanguageManager.LANGUAGES[this.currentLanguage].htmlLang;
  }

  /* Проверка: поддерживается ли язык с таким кодом */
  isSupported(code) {
    return code in LanguageManager.LANGUAGES;  // in — есть ли такое поле в объекте
  }


  /* ---------- СМЕНА ЯЗЫКА ---------- */
  setLanguage(code) {
    // Неизвестный язык или тот же самый — ничего не делаем
    if (!this.isSupported(code) || code === this.currentLanguage) {
      return;
    }

    this.currentLanguage = code;
    this.saveLanguage(code);
    this.notify();  // оповещаем все блоки: «язык поменялся, перерисуйтесь»
  }


  /* ---------- ПЕРЕВОД ---------- */

  /* Перевод по КЛЮЧУ из словаря: translate('nav.products') → 'Продукция' */
  translate(key) {
    const entry = this.dictionary[key];

    // Ключа нет в словаре — предупреждаем в консоли разработчика (F12) и показываем сам ключ
    if (!entry) {
      console.warn(`LanguageManager: нет перевода для ключа "${key}"`);
      return key;
    }

    // Если перевода на текущий язык нет — берём русский
    return entry[this.currentLanguage] ?? entry.ru;
  }

  /* Выбор текста из ОБЪЕКТА { ru, kz, en } (используется для данных: камни, цифры …)
     pick({ ru: 'Гранит', kz: 'Гранит', en: 'Granite' }) → 'Granite' (если язык EN) */
  pick(text) {
    if (!text) {
      return '';
    }
    return text[this.currentLanguage] ?? text.ru ?? '';
  }

  /* Форматирование числа по правилам языка:
     formatNumber(3.6, 1) → '3,6' (RU, KZ) или '3.6' (EN)

     Intl.NumberFormat — встроенный в браузер «форматировщик» чисел.
     Он знает, какой разделитель (запятая/точка) принят в каждом языке. */
  formatNumber(value, decimals = 0) {
    const locale = LanguageManager.LANGUAGES[this.currentLanguage].locale;
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,  // минимум знаков после запятой
      maximumFractionDigits: decimals,  // максимум знаков после запятой
    });
    return formatter.format(value);
  }


  /* ---------- ПАТТЕРН «НАБЛЮДАТЕЛЬ» ---------- */

  /* Подписаться на смену языка.
     listener — ФУНКЦИЯ, которая будет вызвана при каждой смене языка. */
  subscribe(listener) {
    this.listeners.push(listener);  // push — добавить в конец массива
  }

  /* Оповестить всех подписчиков: вызвать каждую сохранённую функцию.
     forEach — «для каждого элемента массива выполни …» */
  notify() {
    this.listeners.forEach((listener) => listener(this.currentLanguage));
  }


  /* ---------- СОХРАНЕНИЕ ВЫБОРА В БРАУЗЕРЕ ----------
     localStorage — маленькое хранилище внутри браузера посетителя.
     Данные остаются даже после закрытия вкладки.

     try / catch — «попробуй, а если ошибка — не ломай сайт».
     В режиме «инкогнито» или при запрете cookies localStorage может выдать ошибку,
     поэтому мы её «ловим» и просто работаем без сохранения. */

  loadSavedLanguage() {
    try {
      const saved = localStorage.getItem(LanguageManager.STORAGE_KEY);
      return this.isSupported(saved) ? saved : null;
    } catch (error) {
      return null;
    }
  }

  saveLanguage(code) {
    try {
      localStorage.setItem(LanguageManager.STORAGE_KEY, code);
    } catch (error) {
      // Сохранить не удалось — ничего страшного, язык просто не запомнится
    }
  }
}
