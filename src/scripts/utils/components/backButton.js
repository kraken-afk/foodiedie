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
    return html`<button @click=${this.clickHandler}>&#8592;</button>`;
  }
}

customElements.define('back-button', BackButton);