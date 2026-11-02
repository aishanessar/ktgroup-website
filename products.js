/* ============================================================
   products.js — КАМНИ (карточки в блоке «Наша продукция»)
   ============================================================
   Каждый камень:
     id       — уникальное короткое имя (латиницей, без пробелов)
     name     — название на 3 языках (как в названиях файлов заказчицы)
     type     — вид камня на 3 языках, или null, если ещё не уточнили
     region   — 'almaty' (Алматинская обл.) или 'zhetysu' (Жетысуская обл.)
     image    — путь к фото текстуры камня
     featured — true  = показывается сразу (первые 4 карточки)
                false = появляется после кнопки «Смотреть всю продукцию»
     href     — ссылка на будущую страницу камня

   Как добавить новый камень: скопируйте один блок { ... },
   вставьте в конец списка и поменяйте значения. Больше ничего менять не нужно —
   класс ProductsSection сам нарисует новую карточку.
   ============================================================ */

export const products = [
  {
    id: 'aidarly1-gabbro',
    name: { ru: 'Айдарлы 1', kz: 'Айдарлы 1', en: 'Aidarly 1' },
    type: { ru: 'Габбро', kz: 'Габбро', en: 'Gabbro' },
    region: 'almaty',
    image: 'images/stones/aidarly1-gabbro.webp',
    featured: true,
    href: '#', // TODO: страница камня
  },
  {
    id: 'aidarly1-granite',
    name: { ru: 'Айдарлы 1', kz: 'Айдарлы 1', en: 'Aidarly 1' },
    type: { ru: 'Гранит', kz: 'Гранит', en: 'Granite' },
    region: 'almaty',
    image: 'images/stones/aidarly1-granite.webp',
    featured: true,
    href: '#',
  },
  {
    id: 'kurty-temir',
    name: { ru: 'Курты Темир', kz: 'Курты Темир', en: 'Kurty Temir' },
    type: null, // TODO: уточнить вид камня (гранит?)
    region: 'almaty',
    image: 'images/stones/kurty-temir.webp',
    featured: true,
    href: '#',
  },
  {
    id: 'arasan1',
    name: { ru: 'Арасан 1', kz: 'Арасан 1', en: 'Arasan 1' },
    type: null, // TODO: уточнить вид камня
    region: 'zhetysu',
    image: 'images/stones/arasan1.webp',
    featured: true,
    href: '#',
  },
  {
    id: 'arasan2',
    name: { ru: 'Арасан 2', kz: 'Арасан 2', en: 'Arasan 2' },
    type: null, // TODO: уточнить вид камня
    region: 'zhetysu',
    image: 'images/stones/arasan2.webp',
    featured: false,
    href: '#',
  },
  {
    id: 'kapal-arasan',
    name: { ru: 'Капал-Арасан', kz: 'Капал-Арасан', en: 'Kapal-Arasan' },
    type: null, // TODO: уточнить вид камня
    region: 'zhetysu',
    // TODO: заменить фото! Загруженный файл «Камень_Капал-Арасан_Жтс.png»
    // оказался точной копией фото Арасан 2.
    image: 'images/stones/kapal-arasan.webp',
    featured: false,
    href: '#',
  },
];
