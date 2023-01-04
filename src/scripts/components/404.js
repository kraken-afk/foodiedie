import { LitElement, html } from "lit";

export default class NotFound extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <h1>404 Not Found</h1>
    `;
  }
}

customElements.define('not-found', NotFound);