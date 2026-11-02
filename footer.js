/* ============================================================
   footer.js — ДАННЫЕ ПОДВАЛА: колонки ссылок и контакты
   ============================================================ */

/* Колонки ссылок. В каждой колонке:
     title — заголовок колонки на 3 языках
     links — список ссылок { label: {ru, kz, en}, href } */
export const footerColumns = [
  {
    title: { ru: 'Компания', kz: 'Компания', en: 'Company' },
    links: [
      { label: { ru: 'О компании',   kz: 'Компания туралы', en: 'About' },      href: '#' }, // TODO
      { label: { ru: 'Производство', kz: 'Өндіріс',         en: 'Production' }, href: '#' }, // TODO
      { label: { ru: 'Качество',     kz: 'Сапа',            en: 'Quality' },    href: '#' }, // TODO
    ],
  },
  {
    title: { ru: 'Продукция', kz: 'Өнімдер', en: 'Products' },
    links: [
      { label: { ru: 'Виды камня', kz: 'Тас түрлері', en: 'Stone types' },    href: '#products' },
      { label: { ru: 'Изделия',    kz: 'Бұйымдар',    en: 'Stone products' }, href: '#' }, // TODO
      { label: { ru: 'Обработка',  kz: 'Өңдеу',       en: 'Processing' },     href: '#' }, // TODO
    ],
  },
  {
    title: { ru: 'Проекты', kz: 'Жобалар', en: 'Projects' },
    links: [
      { label: { ru: 'Наши проекты',    kz: 'Біздің жобалар',        en: 'Our projects' },     href: '#' }, // TODO
      { label: { ru: 'Гос. объекты',    kz: 'Мемлекеттік нысандар',  en: 'Public buildings' }, href: '#' }, // TODO
      { label: { ru: 'Благоустройство', kz: 'Абаттандыру',           en: 'Landscaping' },      href: '#' }, // TODO
    ],
  },
];

/* Контакты компании.
   ⚠️ TODO: телефон и e-mail — ЗАГЛУШКИ. Замените на настоящие перед запуском сайта.
   phoneHref — номер только цифрами с «+» (для ссылки «позвонить» на телефоне). */
export const contacts = {
  title: { ru: 'Контакты', kz: 'Байланыс', en: 'Contacts' },
  phone: '+7 (XXX) XXX-XX-XX',
  phoneHref: '+70000000000',
  email: 'info@example.com',
  address: {
    ru: 'Завод: г. Қонаев, Алматинская обл.',
    kz: 'Зауыт: Қонаев қ., Алматы облысы',
    en: 'Plant: Konaev, Almaty Region',
  },
};
