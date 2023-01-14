import { LitElement, html } from 'lit';
import swal from 'sweetalert';
import Route from '@routes/route';

class SearchBar extends LitElement {
  createRenderRoot() { return this; }

  clickHandler() {
    swal({
      title: 'Search Restaurant',
      buttons: {
        cancel: true,
        confirm: 'Search',
      },
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Search restaurant by name, category or menus',
          'tab-index': 0,
        },
      },
    })
      .then((query) => {
        if (!query) return;
        Route.go(`/search?q=${query.toLowerCase()}`);
      });
  }

  render() {
    return html`
      <button @click=${this.clickHandler} class="search-btn"
        aria-label="hold Enter, type, and release for search">
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24">
          <path
            d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
          </path>
        </svg>
      </button>
    `;
  }
}

customElements.define('search-bar', SearchBar);
