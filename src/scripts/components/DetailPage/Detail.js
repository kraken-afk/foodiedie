import { LitElement, html } from 'lit';
import { PICTURE_MEDIUM_ID, PICTURE_SMALL_ID, REVIEW_ENDPOINT } from '@global/config';
import getRestaurant from '@utils/getRestaurant';
import createLoader from '@utils/components/loader';
import mapSvg from '@images/bx-map.svg';
import starSvg from '@images/bxs-star.svg';
import openLocalDb from '@utils/indexedDb';
import swal from 'sweetalert';
import CommentSection from './CommentSection';
import LikeButton from './LikeButton';
import ReviewForm from './ReviewForm';
import favouriteClickHandler from './handlers/favouriteClickHandler';
import '@utils/components/errorMessage';
import '@utils/components/backButton';

class DetailPage extends LitElement {
  static properties = {
    data: { attribute: false, type: Object },
    code: { attribute: true, type: 'string' },
    commentSection: { attribute: false },
  };

  constructor() {
    super();
    this.code = null;
    this.data = null;
    this.db = null;
    this.commentSection = null;
    this.openDb();
  }

  async openDb() {
    try {
      const db = await openLocalDb();
      this.db = db;
    } catch {
      this.db = null;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    getRestaurant.detail(this.code)
      .then((res) => {
        this.commentSection = res.restaurant.customerReviews;
        this.data = res;
      })
      .then(async () => {
        const { id } = this.data.restaurant;
        const { db } = this;
        const favBtn = document.getElementById('favouriteBtn');

        try {
          const result = await db.get(id) ? 1 : 0;
          favBtn.dataset.isfav = result;
        } catch(err) {
          return;
        }
      });
    window.scrollTo({ top: 0 });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const { db } = this;
    db.close();
  }

  createRenderRoot() { return this; }

  createCard(data, title) {
    return html`
      <div class="detail-card">
        <span class="detail-card__title">${title}</span>
          <ul class="detail-card__list">
            ${data.map(({ name }) => html`<li class="detail-card__list__item">
                  ${name}
                </li>`)}
          </ul>
      </div>
    `;
  }

  async favouriteClickHandler() {
    favouriteClickHandler(this.db, this.data);
  }

  submitHandler(event) {
    event.preventDefault();
    const payload = {
      id: this.getAttribute('code'),
      name: document.getElementById('name').value,
      review: document.getElementById('review').value,
    };

    this.POSTHandler(payload)
      .then((response) => {
        const { error, customerReviews } = response;
        if (error) {
          swal({
            title: 'Something went wrong',
            text: 'Couldn\'t send review',
            icon: 'warning',
          });
        } else {
          swal({
            title: 'review submitted',
            icon: 'info',
          });
          this.commentSection = customerReviews;
          document.getElementById('name').value = '';
          document.getElementById('review').value = '';
        }
      });
  }

  async POSTHandler(payload) {
    const response = await fetch(REVIEW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  render() {
    if (this.data === null) {
      return html`
      <div class="loader-container">
      ${createLoader()}
      </div>
      `;
    }

    if (this.data.error) {
      return html`
      <error-message></error-message>
      <back-button></back-button>
      `;
    }

    const {
      restaurant: {
        name, description, city,
        address, pictureId, rating,
        categories, menus,
      },
    } = this.data;

    const { foods, drinks } = menus;

    return html`
    <div class="detail__header">
      <main class="detail__header__description" id="mainContent" tabindex="0">
        <h1>${name}</h1>
        <p>${description}</p>
      </main>
      <figure class="detail__header__figure">
        <picture>
          <source media="(max-width: 578)" srcset="${PICTURE_SMALL_ID + pictureId}" alt="image of ${name}"/>
          <img class="detail__header__figure__thumbnail" src="${PICTURE_MEDIUM_ID + pictureId}" alt="image of ${name}" />
        </picture>
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
    ${new CommentSection(this.commentSection).render()}
    ${new ReviewForm(this.submitHandler).render()}
    ${new LikeButton(this.favouriteClickHandler).render()}
    <back-button ></back-button>
    `;
  }
}

customElements.define('detail-page', DetailPage);
