import { LitElement, html } from 'lit';
import '@scss/template.scss';

class Loader extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    `;
  }
}

customElements.define('loader-element', Loader);

export default function createLoader() {
  const loader = document.createElement('loader-element');
  loader.classList.add('loader');

  return loader;
}
