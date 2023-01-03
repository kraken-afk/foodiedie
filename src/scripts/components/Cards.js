import { html, LitElement } from 'lit';
import mapSvg from '../../public/images/bx-map.svg';
import starSvg from '../../public/images/bxs-star.svg';
import { PICTURE_SMALL_ID } from '../global/config';

export default class RestaurantCard extends LitElement {
  constructor(code) {
    super();
    this.code = code ?? null;
  }

  readMoreClickHanlder(event) {
    const modal = document.createElement('card-modal');
    const blur = document.createElement('div');

    blur.setAttribute('class', 'blured');
    modal.setAttribute('code', this.code);

    document.body.insertBefore(blur, document.body.firstChild);
    document.body.insertBefore(modal, document.body.firstChild);
    document.body.style.overflow = 'hidden';

    window.latestClickEvent = event.target;

    setTimeout(() => document.querySelector('.modal__button').focus(), 0);
  }

  render() {
    if (!this.code) throw new TypeError('`code` attribute cannot be empty');
    const {
      name, description, city, pictureId: source, rating,
    } = this.code;

    return html`
      <div class="card" tabindex="0">
        <figure class="card__img">
          <img draggable="false" src=${PICTURE_SMALL_ID + source} alt="${name} image," />
          <span aria-label=${`rating: ${rating} star,`} class="card__rating"> <img width="18" src=${starSvg} alt="" /> ${rating}</span>
        </figure>
        <article class="card__description">
          <div class="card__header">
            <h3>${name}</h3>
            <span aria-label=${`placed at ${city},`} class="card__city"> <img width="18" src=${mapSvg} alt="" /> ${city}</span>
          </div>
          <p class="truncate">${description}</p>
          <button @click=${this.readMoreClickHanlder} aria-hidden="true" aria-disabled class="card__button">read more...</button>
          </article>
      </div>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);
