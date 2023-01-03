import { LitElement, html } from 'lit';
import './Cards';
import data from '../../DATA.json';

class RestaurantList extends LitElement {
  createRenderRoot() {
    return this;
  }

  createCard(code) {
    const card = document.createElement('restaurant-card');

    card.setAttribute('code', code);
    return card;
  }

  render() {
    const { restaurants } = data;

    return html`
      <div class="list">
        ${restaurants.map((item) => this.createCard(item.id))}
      </div>
    `;
  }
}

customElements.define('restaurant-list', RestaurantList);
