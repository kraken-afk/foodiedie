/* eslint-disable max-len */
import { LitElement, html } from 'lit';
// import mapSvg from '../../public/images/bx-map.svg';
// import starSvg from '../../public/images/bxs-star.svg';

class CardModal extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    this.code = this.getAttribute('code') ?? null;
    this.classList.add('modal');
  }

  static get properties() {
    return {
      code: { type: String, attribute: true },
    };
  }

  createRenderRoot() { return this; }

  // get data() {
  //   const { restaurants } = data;
  //   return restaurants.find((e) => e.id === this.code);
  // }

  closeButtonHandler() {
    const elements = [document.body.children[0], document.body.children[1]];

    elements.forEach((e) => {
      e.onanimationend = ({ target }) => target.remove();
      e.classList.add('exit');
    });
    document.body.removeAttribute('style');
    setTimeout(() => window.latestClickEvent.focus(), 0);
  }

  render() {
    return html``;
  }

  // render() {
  //   if (!this.code) throw new TypeError('`code` attribute cannot be empty');
  //   const {
  //     name, description, city, pictureId: source, rating,
  //   } = this.data;

  //   return html`
  //   <div style=${`background-image: url('${source}')`} class="modal__img"></div>
  //   <div class="modal__description">
  //     <span class="modal__status">
  //       <h3 class="modal__title">${name}</h3>
  //       <div>
  //         <span aria-label=${`placed at ${city}`} class="modal__city"> <img width="18" src=${mapSvg} alt="" /> ${city}</span>
  //         <span aria-label=${`rating: ${rating}`} class="modal__rating"> <img width="18" src=${starSvg} alt="" /> ${rating}</span>
  //       </div>
  //     </span>
  //     <p class="modal__paragraph">${description}</p>
  //     <button tabindex="0" @click=${this.closeButtonHandler} class="modal__button"
  //     @keydown=${(event) => {
  //   if (!event.key === 'Tab') return;
  //   this.closeButtonHandler();
  // }}
  //     >close</button>
  //   </div>
  //   `;
  // }
}

customElements.define('card-modal', CardModal);
