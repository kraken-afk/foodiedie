import { LitElement, html } from 'lit';
import './RestaurantsList';

export default class HomeComponent extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
    <main class="main">
      <article class="main__description" id="main-article" tabindex="0">
        <h2 id="explore" class="main__title" aria-label="Healthy Restaurant's Nearby,">Healthy Restaurant's Nearby</h2>
        <p class="main__paragraph">Healthy food is important for our body, so we have list of restaurant's that provide healthy food, placed near your area.</p>
      </article>
      <restaurant-list id="restaurant-list"></restaurant-list>
    </main>
    `;
  }
}

customElements.define('home-component', HomeComponent);
