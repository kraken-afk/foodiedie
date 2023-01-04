import { LitElement, html } from 'lit';
import getRestaurant from '@utils/getRestaurant';
import RestaurantCard from './Cards';
import '@utils/components/loader';

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
      const loader = document.createElement('loader-element');
      return loader;
    }
    const { restaurants } = this.data;
    return html`${restaurants.map((item) => this.createCard(item))
    }`;
  }
}

customElements.define('restaurant-list', RestaurantList);
