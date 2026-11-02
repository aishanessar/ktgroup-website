# Сайт Karavan Temir Group (KT Group)

Главная страница сайта. HTML5 + CSS + JavaScript, строгое ООП, ES6-модули.

## Как запустить

1. Откройте папку `ktgroup-website` в VS Code.
2. Установите расширение **Live Server** (вкладка Extensions → поиск «Live Server» → Install).
3. Нажмите **Go Live** в правом нижнем углу.
4. Сайт откроется по адресу вида `http://127.0.0.1:5500`.

> Двойной клик по `index.html` покажет пустую страницу: браузер не разрешает ES6-модулям загружаться прямо с диска.

## Структура

```
ktgroup-website/
├── index.html                 ← скелет страницы: пустые контейнеры + подключение main.js
├── css/                       ← один CSS-файл на один блок
│   ├── base.css               ← переменные (цвета, шрифты), кнопки, общие стили
│   ├── header.css             ← шапка + переключатель языка
│   ├── hero.css               ← первый экран
│   ├── advantages.css         ← 4 преимущества
│   ├── products.css           ← карточки камней
│   ├── stats.css              ← блок с цифрами
│   └── footer.css             ← подвал
├── js/
│   ├── main.js                ← точка входа: new App().init()
│   ├── core/                  ← ядро
│   │   ├── App.js             ← главный класс: создаёт и запускает все блоки
│   │   ├── Component.js       ← РОДИТЕЛЬСКИЙ класс всех блоков
│   │   └── LanguageManager.js ← языки RU / KZ / EN
│   ├── components/            ← блоки страницы и их «кирпичики»
│   │   ├── Header.js              extends Component
│   │   ├── LanguageSwitcher.js    extends Component
│   │   ├── HeroSection.js         extends Component
│   │   ├── AdvantagesSection.js   extends Component  → использует AdvantageCard
│   │   ├── AdvantageCard.js
│   │   ├── ProductsSection.js     extends Component  → использует ProductCard
│   │   ├── ProductCard.js
│   │   ├── StatsSection.js        extends Component  → использует StatItem, CountUpAnimation
│   │   ├── StatItem.js
│   │   └── Footer.js              extends Component
│   ├── utils/
│   │   └── CountUpAnimation.js ← анимация «досчитывания» цифр
│   └── data/                  ← ВСЕ ТЕКСТЫ И ДАННЫЕ (код менять не нужно)
│       ├── translations.js    ← тексты интерфейса на 3 языках
│       ├── navigation.js      ← пункты меню
│       ├── advantages.js      ← 4 преимущества
│       ├── products.js        ← камни
│       ├── stats.js           ← цифры
│       ├── footer.js          ← ссылки и контакты подвала
│       └── icons.js           ← SVG-иконки
└── images/
    ├── logo/      ← логотип (извлечён из лого.png на прозрачный фон)
    ├── hero/      ← фото карьера (используется на 1-м экране и в блоке цифр)
    ├── stones/    ← текстуры 6 камней
    ├── projects/  ← фото проектов (для будущей страницы «Проекты»)
    └── production/← фото завода (для будущей страницы «Производство»)
```

## Как устроено ООП

- **Наследование:** все блоки страницы — наследники `Component` (`class HeroSection extends Component`). Родитель даёт им `update()`, `mount()`, `t()`, `pick()`. Каждый наследник обязан написать свой `render()`.
- **Композиция:** блок содержит объекты-«кирпичики»: `ProductsSection` содержит массив `ProductCard`, `Header` содержит `LanguageSwitcher`.
- **Полиморфизм:** `App` вызывает `mount()` у всех блоков одинаково, но каждый рисует себя по-своему.
- **Наблюдатель:** блоки подписываются на `LanguageManager`; при смене языка он оповещает всех, и они перерисовываются.

## Частые задачи

**Поменять текст** → найдите его в `js/data/…` и исправьте во всех трёх языках.

**Добавить камень** → в `js/data/products.js` скопируйте блок `{ … }`, поменяйте значения, положите фото в `images/stones/`. `featured: true` — видно сразу, `false` — после кнопки «Смотреть всю продукцию».

**Поменять цвет сайта** → `css/base.css`, блок `:root` (переменные).

**Добавить новый блок на страницу** → см. комментарий в начале `js/core/App.js`.

## Что ещё нужно сделать (TODO)

- [ ] Настоящие телефон и e-mail → `js/data/footer.js`
- [ ] Фото камня Капал-Арасан: загруженный файл оказался копией Арасан 2
- [ ] Вид камня (гранит / габбро) для Курты Темир, Арасан 1, Арасан 2, Капал-Арасан → `js/data/products.js`
- [ ] Проверка казахских текстов носителем языка
- [ ] Фото карьера в большем разрешении (сейчас 757×450, на больших экранах слегка размыто)
- [ ] Ссылки меню на будущие страницы → `js/data/navigation.js`
