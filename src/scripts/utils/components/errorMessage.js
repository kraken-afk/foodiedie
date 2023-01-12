import { LitElement, html } from "lit";

class ErrorMessage extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
    <div class="err-msg">
      <p>\:(</p>
      <p>Something went error</p>
    </div>
    `;
  }
}

customElements.define('error-message', ErrorMessage);