import { html, LitElement } from 'lit';
import { PICTURE_SMALL_ID, PICTURE_MEDIUM_ID } from '@global/config';
import mapSvg from '@images/bx-map.svg';
import starSvg from '@images/bxs-star.svg';
import Route from '@routes/route';

export default class RestaurantCard extends LitElement {
  constructor(data) {
    super();
    this.data = data ?? null;
  }

  clickHandler(event) {
    event.preventDefault();
    const { id } = event.target.dataset
    Route.go('/detail/' + id);
  }

  render() {
    if (!this.data) throw new TypeError('`data` attribute cannot be empty');
    const {
      name, description, city, pictureId: source, rating, id
    } = this.data;

    return html`
      <div class="card" tabindex="0">
        <figure class="card__img">
          <img
          srcset="${PICTURE_MEDIUM_ID + source} 2x"
          @click=${this.clickHandler}
          data-id="${id}" loading="lazy"
          draggable="false" src=${PICTURE_SMALL_ID + source}
          alt="${name} image," />
          <span aria-label=${`rating: ${rating} star,`} class="card__rating"> <img width="18" src=${starSvg} alt="" /> ${rating}</span>
        </figure>
        <article class="card__description">
          <div class="card__header">
            <h3 class="truncate-one" title="${name}">${name}</h3>
            <span aria-label=${`placed at ${city},`} class="card__city"> <img width="18" src=${mapSvg} alt="" /> ${city}</span>
          </div>
          <p class="truncate">${description}</p>
          <button @click=${this.clickHandler} data-id="${id}" class="card__button">read more...</button>
          </article>
      </div>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);
