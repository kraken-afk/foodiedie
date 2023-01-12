import { LitElement, html } from 'lit';
import './RestaurantsList';
import '../NavBar';
import '@utils/components/searchBar';

export default class HomePage extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
    <header class="header">
      <h1 class="header__title" tabindex="0">
        <span>Eat</span>
        <span>healthy</span>
      </h1>
      <a class="header__link" href="#explore">Explore Restaurant</a>
    </header>
    <nav-bar></nav-bar>
    <main class="main">
      <article class="main__description" id="main-article" tabindex="0">
        <h2 id="explore" class="main__title" aria-label="Healthy Restaurant's Nearby,">Healthy Restaurant's Nearby</h2>
        <p class="main__paragraph">Healthy food is important for our body, so we have list of restaurant's that provide healthy food, placed near your area.</p>
        <search-bar></search-bar>
      </article>
      <restaurant-list id="restaurant-list"></restaurant-list>
    </main>
    `;
  }
}

customElements.define('home-page', HomePage);
