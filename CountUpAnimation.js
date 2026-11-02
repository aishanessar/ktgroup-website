/* ============================================================
   CountUpAnimation.js — АНИМАЦИЯ «ДОСЧИТЫВАНИЯ» ЧИСЛА (0 → 19)
   ============================================================
   Вспомогательный класс: не рисует блок, а только плавно меняет
   число внутри переданного HTML-элемента.

   Как это работает (продвинутая часть — подробно):
     1. Браузер перерисовывает экран примерно 60 раз в секунду.
     2. requestAnimationFrame(функция) просит: «перед следующей
        перерисовкой экрана вызови мою функцию».
     3. Наша функция step() каждый раз считает, сколько времени прошло,
        вычисляет текущее число и снова просит requestAnimationFrame.
     4. Так получается ~60 обновлений в секунду → плавная анимация.
     5. Когда время вышло — ставим точное конечное число и останавливаемся.
   ============================================================ */

export class CountUpAnimation {

  /* Длительность анимации по умолчанию: 1800 миллисекунд = 1,8 секунды */
  static DEFAULT_DURATION = 1800;

  /* element    — HTML-элемент, в котором показывается число
     target     — конечное число (например, 19)
     formatter  — ФУНКЦИЯ, превращающая число в текст (3.6 → '3,6').
                  Функцию можно передать как обычное значение — это «колбэк» (callback).
     duration   — длительность в миллисекундах */
  constructor(element, target, formatter, duration = CountUpAnimation.DEFAULT_DURATION) {
    this.element = element;
    this.target = target;
    this.formatter = formatter;
    this.duration = duration;
    this.startTime = null;  // момент старта (узнаем при первом кадре)
  }

  /* «Плавность»: в начале число растёт быстро, к концу — замедляется.
     t — доля прошедшего времени от 0 до 1. Возвращает долю пути от 0 до 1.
     Формула 1 − (1 − t)³ называется easeOutCubic. */
  static easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /* Запустить анимацию */
  start() {
    // Если посетитель отключил анимации в системе — сразу показываем итог.
    // matchMedia проверяет CSS-медиазапрос прямо из JavaScript.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.showValue(this.target);
      return;
    }

    requestAnimationFrame(this.step);
  }

  /* Один «кадр» анимации.
     ВАЖНО: step записан как стрелочная функция-поле (step = (...) => {...}),
     а не как обычный метод. Причина: requestAnimationFrame вызывает функцию
     «отдельно» от объекта, и в обычном методе this потерялся бы (стал бы undefined).
     Стрелочная функция «запоминает» this нашего объекта навсегда.

     timestamp — текущее время в миллисекундах, браузер передаёт его сам. */
  step = (timestamp) => {
    if (this.startTime === null) {
      this.startTime = timestamp;  // первый кадр — запоминаем старт
    }

    const elapsed = timestamp - this.startTime;                   // сколько прошло мс
    const progress = Math.min(elapsed / this.duration, 1);        // доля времени 0…1 (не больше 1)
    const easedProgress = CountUpAnimation.easeOutCubic(progress); // доля пути с «плавностью»

    this.showValue(this.target * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(this.step);  // ещё не конец → следующий кадр
    } else {
      this.showValue(this.target);       // конец → точное итоговое число
    }
  };

  /* Показать число в элементе (через formatter — с нужной запятой/точкой) */
  showValue(value) {
    this.element.textContent = this.formatter(value);
  }
}
