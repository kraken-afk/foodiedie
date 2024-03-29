import { LitElement, html } from 'lit';
import RestaurantCard from '@utils/components/Card';
import createLoader from '@utils/components/loader';
import openLocalDb from '@utils/indexedDb';
import '../NavBar';
import '@utils/components/backButton';
import '@utils/components/errorMessage';

class FavouritePage extends LitElement {
  static properties = {
    data: { attribute: false, type: Array },
  };

  constructor() {
    super();
    this.data = null;
    this.db = null;
  }

  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    openLocalDb()
      .then(async (db) => {
        this.db = db;
        this.data = await db.getAll();
      });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const { db } = this;
    db.close();
  }

  createCard(code) {
    const card = new RestaurantCard(code);
    return card.render();
  }

  render() {
    if (this.data === null) {
      return html`
      <div class="loade r-container">
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

    window.scrollTo({ top: 0 });

    return html`
    <nav-bar></nav-bar>
    <main class="favourite-page">
      <h1 class="favourite-page__title">Your favourite restaurant's</h1>
      <div class="list" id="mainContent" tabindex="0">
        ${
  !this.data.length ? html`<h2 class="favourite-page__zero">Nothing here</h2>`
    : this.data.map((item) => this.createCard(item))
}
      </div>
    </main>
    <back-button></back-button>
    `;
  }
}

customElements.define('favourite-page', FavouritePage);
