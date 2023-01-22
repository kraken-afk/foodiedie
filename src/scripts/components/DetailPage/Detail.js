import { LitElement, html, } from 'lit';
import { PICTURE_MEDIUM_ID, REVIEW_ENDPOINT } from '@global/config';
import getRestaurant from '@utils/getRestaurant';
import createLoader from '@utils/components/loader';
import mapSvg from '@images/bx-map.svg';
import starSvg from '@images/bxs-star.svg';
import openLocalDb from '@utils/indexedDb';
import swal from 'sweetalert';
import CommentSection from './CommentSection';
import '@utils/components/errorMessage';

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
        const result = await db.get(id) ? 1 : 0;
        favBtn.dataset.isfav = result;
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
    if (this.db === null) return;

    const favBtn = document.getElementById('favouriteBtn');
    const { restaurant } = this.data;
    const { db } = this;

    if (+favBtn.dataset.isfav) {
      await db.remove(restaurant.id);
      favBtn.dataset.isfav = 0;
    } else {
      await db.add(restaurant);
      favBtn.dataset.isfav = 1;
    }
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
    ${new CommentSection(this.commentSection).render()}
    <form @submit=${this.submitHandler} action="POST" class="form-review">
      <span class="form-title">Add review</span>
        <div class="input-wrapper">
          <input required type="text" id="name" placeholder="Your name.."/>
        </div>
        <div class="input-wrapper-textarea">
          <textarea required placeholder="Review.." id="review" name="review" cols="50" rows="5"></textarea>
        </div>
        <button class="submit-btn">Submit</button>
      </form>
    <button @click=${this.favouriteClickHandler} data-isfav="0" id="favouriteBtn" aria-label="favourite button">
      <svg xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24' fill='#000000'
        width='24' height='24'>
        <path
          d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z">
        </path>
      </svg>
    </button>
    <back-button ></back-button>
    `;
  }
}

customElements.define('detail-page', DetailPage);
