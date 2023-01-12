import { html, LitElement } from 'lit';
import Route from '@routes/route';

class BackButton extends LitElement {
  constructor() {
    super();
    this.classList.add('back-button');
  }

  createRenderRoot() { return this; }

  clickHandler() {
    Route.back();
  }

  render() {
    return html`<button @click=${this.clickHandler}>
      <svg xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24' fill='#000000'
        width='24' height='24'>
        <path
          d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-5v4l-5-5 5-5v4h5v2z">
        </path>
      </svg>
    </button>`;
  }
}

customElements.define('back-button', BackButton);