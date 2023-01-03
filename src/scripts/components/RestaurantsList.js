import { LitElement, html } from 'lit';
import getRestaurant from '../utils/getRestaurant';
import RestaurantCard from './Cards';

export default class RestaurantList extends LitElement {
  static properties = {
    data: { attribute: false, state: true },
  };

  constructor() {
    super();
    this.data = null;

    this.classList.add('list');
    this.setData();
  }

  setData() {
    getRestaurant.list()
      .then((e) => {
        this.data = e;
      });
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
      return html`wait...`;
    }
    const { restaurants } = this.data;
    console.log(restaurants);

    return html`${restaurants.map((item) => this.createCard(item))
    }`;
  }
}

customElements.define('restaurant-list', RestaurantList);
