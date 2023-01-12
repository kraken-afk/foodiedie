import { LitElement, html } from "lit";

export default class NotFound extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <nav-bar></nav-bar>
      <div class="err404">
        <h1>Err' 404 Not Found</h1>
      </div>
    `;
  }
}

customElements.define('not-found', NotFound);