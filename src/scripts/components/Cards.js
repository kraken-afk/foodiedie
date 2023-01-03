import { html, LitElement } from 'lit';
import mapSvg from '../../public/images/bx-map.svg';
import starSvg from '../../public/images/bxs-star.svg';
import { PICTURE_SMALL_ID } from '../global/config';

export default class RestaurantCard extends LitElement {
  constructor(code) {
    super();
    this.code = code ?? null;
  }

  readMoreClickHanlder() {
    alert('click more');
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
            <h3 class="truncate-one" title="${name}">${name}</h3>
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
