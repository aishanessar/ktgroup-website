/* ============================================================
   Footer.js — ПОДВАЛ САЙТА
   ============================================================
   Наследует Component.
   Содержит: логотип с описанием, 3 колонки ссылок, колонку
   контактов и строку копирайта с текущим годом.
   ============================================================ */

import { Component } from '../core/Component.js';

export class Footer extends Component {

  /* columns  — колонки ссылок из data/footer.js
     contacts — контакты из data/footer.js
     logoSrc  — путь к логотипу */
  constructor(root, languageManager, columns, contacts, logoSrc) {
    super(root, languageManager);
    this.columns = columns;
    this.contacts = contacts;
    this.logoSrc = logoSrc;
  }

  /* HTML одной колонки ссылок */
  renderColumn(column) {
    const links = column.links
      .map((link) => `<li><a class="footer__link" href="${link.href}">${this.pick(link.label)}</a></li>`)
      .join('');

    return `
      <div class="footer__column">
        <h3 class="footer__heading">${this.pick(column.title)}</h3>
        <ul class="footer__links">${links}</ul>
      </div>
    `;
  }

  /* HTML колонки контактов.
     href="tel:…"    — на телефоне по клику откроется набор номера;
     href="mailto:…" — по клику откроется почтовая программа. */
  renderContacts() {
    const { title, phone, phoneHref, email, address } = this.contacts;

    return `
      <div class="footer__column">
        <h3 class="footer__heading">${this.pick(title)}</h3>
        <ul class="footer__links">
          <li><a class="footer__link" href="tel:${phoneHref}">${phone}</a></li>
          <li><a class="footer__link" href="mailto:${email}">${email}</a></li>
          <li><span class="footer__link">${this.pick(address)}</span></li>
        </ul>
      </div>
    `;
  }

  render() {
    const columnsHtml = this.columns.map((column) => this.renderColumn(column)).join('');

    // new Date().getFullYear() — текущий год: копирайт обновляется сам каждый год
    const year = new Date().getFullYear();

    return `
      <div class="container footer__inner">
        <div class="footer__brand">
          <a class="footer__logo" href="#" aria-label="${this.t('header.homeLink')}">
            <img src="${this.logoSrc}" alt="KT Group — Karavan Temir Group" width="342" height="135" loading="lazy">
          </a>
          <p class="footer__description">${this.t('footer.description')}</p>
        </div>

        <div class="footer__columns">
          ${columnsHtml}
          ${this.renderContacts()}
        </div>
      </div>

      <div class="footer__bottom">
        <div class="container">
          © ${year} Karavan Temir Group. ${this.t('footer.rights')}
        </div>
      </div>
    `;
  }
}
