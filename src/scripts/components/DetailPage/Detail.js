import { LitElement, html } from "lit";
import getRestaurant from '@utils/getRestaurant';
import createLoader from '@utils/components/loader';
import { PICTURE_MEDIUM_ID } from '@global/config';
import mapSvg from '@images/bx-map.svg';
import starSvg from '@images/bxs-star.svg';
import CommentSection from "./CommentSection";

class DetailPage extends LitElement {
  static properties = {
    data: { attribute: false, type: Object },
    code: { attribute: true, type: 'string' },
  }

  constructor() {
    super();
    this.code = null;
    this.data = null;
  }

  connectedCallback() {
    super.connectedCallback();

    getRestaurant.detail(this.code)
      .then((res) => this.data = res);
  }

  createRenderRoot() { return this; }

  createCard(data, title) {
    return html`
      <div class="detail-card">
        <span class="detail-card__title">${title}</span>
          <ul class="detail-card__list">
            ${data.map(({ name }) =>
                html`<li class="detail-card__list__item">
                  ${ name }
                </li>`)}
          </ul>
      </div>
    `;
  }

  render() {
    if (this.data === null) {
      return html`
      <div class="loader-container">
      ${createLoader()}
      </div>
      `;
    }

    const { restaurant: {
      name, description, city,
      address, pictureId, rating,
      categories, menus, customerReviews
    } } = this.data;
    window.scrollTo({ top: 0 });

    const { foods, drinks } = menus;

    return html`
    <div class="detail__header">
      <div class="detail__header__description">
        <h1>${name}</h1>
        <p>${description}</p>
      </div>
      <figure class="detail__header__figure">
        <img class="detail__header__figure__thumbnail" src="${PICTURE_MEDIUM_ID + pictureId}" alt="image of ${name}" />
        <span aria-label=${`rating: ${rating} star,`} class="detail__header__figure__rating">
          <img width="18" src=${starSvg} alt="" /> ${rating}
        </span>
        <span aria-label=${`placed at ${city},`} class="detail__header__figure__city"> <img width="18" src=${mapSvg} alt="" /> ${city}</span>
      </figure>
    </div>
    <span class="address">${address}</span>
    ${this.createCard(categories, 'categories')}
    <div class="lists-container">
      ${this.createCard(foods, 'foods')}
      ${this.createCard(drinks, 'drinks')}
    </div>
    <span class="reviews-title">Reviews</span>
    ${new CommentSection(customerReviews).render()}
    `;

  }
}

customElements.define('detail-page', DetailPage);