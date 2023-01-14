import { LitElement, html } from 'lit';
import createLoader from '@utils/components/loader';
import getRestaurant from '@utils/getRestaurant';
import RestaurantCard from '@utils/components/Card';
import '@utils/components/errorMessage';

class SearchReult extends LitElement {
  static properties = {
    query: { attribute: true, type: 'string' },
    data: { attribute: false, type: Object },
  };

  constructor() {
    super();
    this.query = this.getAttribute('query');
    this.data = null;
    this.classList.add('search-result-container');
  }

  createRenderRoot() { return this; }

  createCard(restaurant) {
    const card = new RestaurantCard(restaurant);
    return card.render();
  }

  connectedCallback() {
    super.connectedCallback();
    this.getData();
  }

  async getData() {
    const response = await getRestaurant.search(this.query);
    this.data = response;
  }

  render() {
    if (this.data === null) {
      return createLoader();
    }

    if (this.data.error) {
      return html`
      <error-message></error-message>
      <back-button></back-button>
      `;
    }

    window.scrollTo({ top: 0 });
    const { restaurants } = this.data;

    return html`
      <h1 class="search-title">Results for ${this.query}</h1>
      <search-bar></search-bar>
      <div class="list" id="mainContent" tabindex="0">
        ${
  !restaurants.length
    ? html`<p class="search-zero">Sorry, no result for '${this.query}'</p>`
    : restaurants.map((restaurant) => this.createCard(restaurant))
}
      </div>
      <back-button></back-button>
    `;
  }
}

customElements.define('search-result', SearchReult);
