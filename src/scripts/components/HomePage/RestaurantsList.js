import { LitElement, html } from 'lit';
import getRestaurant from '@utils/getRestaurant';
import RestaurantCard from '@utils/components/Card';
import createLoader  from '@utils/components/loader';
import '@utils/components/errorMessage';

export default class RestaurantList extends LitElement {
  static properties = {
    data: { attribute: false, state: true },
  };

  constructor() {
    super();
    this.data = null;
    this.classList.add('list');

    getRestaurant.list()
      .then((res) => this.data = res);
  }

  createRenderRoot() {
    return this;
  }

  createCard(code) {
    const card = new RestaurantCard(code);
    return card.render();
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

    const { restaurants } = this.data;
    return html`${restaurants.map((item) => this.createCard(item))
    }`;
  }
}

customElements.define('restaurant-list', RestaurantList);
