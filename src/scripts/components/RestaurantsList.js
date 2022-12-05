import { LitElement, html } from "lit";
import "./Cards";
import data from "../../DATA.json";

class RestaurantList extends LitElement {
  createRenderRoot() {
    return this;
  }

  createCard(id) {
    const card = document.createElement("restaurant-card");

    card.setAttribute("_id", id);
    return card;
  }

  render() {
    const { restaurants } = data;

    return html`
      <div class="list">
        ${restaurants.map(item => this.createCard(item.id))}
      </div>
    `;
  }

}

customElements.define("restaurant-list", RestaurantList);