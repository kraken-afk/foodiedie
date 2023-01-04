import { LitElement, html } from 'lit';

export default class DetailComponent extends LitElement {
  constructor(id) {
    super();
    this.code = id;
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <h1 style="color: yellow">Hello ${this.code}</h1>
    `;
  }
}

customElements.define('detail-component', DetailComponent);
