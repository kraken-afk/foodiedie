import { LitElement, html } from 'lit';
import svgLeaf from '@images/leaf-svgrepo-com.svg';
import homeSvg from '@images/bx-home-circle.svg';
import heartSvg from '@images/bx-heart.svg';
import meSvg from '@images/bx-ghost.svg';

class NavBar extends LitElement {
  constructor() {
    super();
    this.menuBtnStatus = false;
  }

  static properties = {
    menuBtnStatus: { type: Boolean },
  };

  createRenderRoot() {
    return this;
  }

  navKeydownHandler(event) {
    if (event.key === 'Tab') {
      if (event.target.parentElement.classList.contains('active')) {
        document.querySelector('.nav__menu-btn').click();
      }

      this.menuBtnStatus = false;
    }
  }

  menuBtnClickHandler(event) {
    const navList = document.querySelector('.nav__list');
    const btn = document.querySelector('.nav__menu-btn');
    const div = document.createElement('div');

    div.classList.add('blured');
    div.onclick = () => document.querySelector('.nav__menu-btn').click();

    if (!btn.classList.contains('active')) {
      btn.classList.add('active');
      navList.classList.add('active');

      document.body.insertBefore(div, document.body.firstElementChild);
      document.body.style.overflow = 'hidden';
    } else {
      btn.classList.remove('active');
      navList.classList.remove('active');

      document.body.firstElementChild.onanimationend = ({ target }) => target.remove();
      document.body.firstElementChild.classList.add('exit');
      document.body.removeAttribute('style');
    }
    event.stopPropagation();
  }

  keydownHandler(event) {
    if (event.key === 'Enter') {
      event.target.click();
      this.menuBtnStatus = !this.menuBtnStatus;
    }
  }

  render() {
    return html`
        <nav class="nav nav--light">
          <a href="./" class="nav__title">Foodiedie
          <span class="nav__title__leaf-logo">
            <img width="32" src=${svgLeaf} alt="" />
          </span>
          </a>
          <div @click=${this.menuBtnClickHandler} @keydown=${this.keydownHandler} tabindex="0" class="nav__menu-btn" aria-label="menu button, ${this.menuBtnStatus ? 'opened' : 'closed'}, click enter to ${!this.menuBtnStatus ? 'open' : 'close'} ${this.menuBtnStatus ? 'and click tab for navigation' : ''}">
              <div class="nav__menu-btn__line"></div>
              <div class="nav__menu-btn__line"></div>
          </div>
          <div class="nav__list">
            <a href="./" class="nav__item"><img src=${homeSvg} alt="" /> Home</a>
            <a href="#" class="nav__item"><img src=${heartSvg} alt="" /> Favorite</a>
            <a @keydown=${this.navKeydownHandler} href="https://github.com/kraken-afk" target="_blank" class="nav__item"><img src=${meSvg} alt="" /> About Us</a>
          </div>
        </nav>`;
  }
}

customElements.define('nav-bar', NavBar);
