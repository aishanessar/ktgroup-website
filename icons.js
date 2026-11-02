/* ============================================================
   icons.js — SVG-ИКОНКИ сайта
   ============================================================
   SVG — это картинка, описанная кодом (линии, круги), а не пикселями.
   Плюсы: не размывается при любом размере и красится через CSS.

   stroke="currentColor" → линии рисуются ТЕКУЩИМ цветом текста,
   поэтому цвет иконки задаётся в CSS свойством color.

   Шаблонные строки `...` (обратные кавычки) позволяют писать
   текст в несколько строк — так SVG-код удобнее читать.
   ============================================================ */

export const icons = {

  /* Горы и солнце — «Собственные месторождения» */
  quarry: `
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 34h34" />
      <path d="M5 34l10-16 6 8 5-7 10 15" />
      <path d="M15 18l-2 6M26 19l2 5" />
      <circle cx="30" cy="9" r="3" />
    </svg>`,

  /* Здание завода с трубой — «Собственный завод» */
  factory: `
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 34h34" />
      <path d="M5 34V20l7-5v5l7-5v5l7-5v19" />
      <path d="M28 34V7h5v27" />
      <path d="M9 27h3M15 27h3M21 27h3" />
    </svg>`,

  /* Стопка плит — «Изделия под любой проект» */
  slabs: `
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 17l15-7 15 7-15 7z" />
      <path d="M5 23l15 7 15-7" />
      <path d="M5 29l15 7 15-7" />
    </svg>`,

  /* Здание с колоннами — «Опыт» (государственные объекты) */
  landmark: `
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 15L20 6l15 9z" />
      <path d="M10 18v12M17 18v12M23 18v12M30 18v12" />
      <path d="M7 30h26M4 34h32" />
    </svg>`,

  /* Стрелка вправо — в кнопках и карточках */
  arrowRight: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>`,

  /* Маленькая «галочка» вниз — в переключателе языка */
  chevronDown: `
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2 3.5l3 3 3-3" />
    </svg>`,
};
