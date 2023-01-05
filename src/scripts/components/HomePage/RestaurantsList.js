import { LitElement, html } from 'lit';
import getRestaurant from '@utils/getRestaurant';
import RestaurantCard from './Cards';
import createLoader  from '@utils/components/loader';

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

    const { restaurants } = this.data;
    return html`${restaurants.map((item) => this.createCard(item))
    }`;
  }
}

customElements.define('restaurant-list', RestaurantList);
