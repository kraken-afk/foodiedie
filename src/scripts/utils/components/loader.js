import { LitElement, html } from 'lit';
import '@scss/template.scss';
import '@utils/components/offllineLoader';

class Loader extends LitElement {
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
  if (!navigator.onLine) {
    return html`<offline-loader></offline-loader>`;
  }

  const loader = document.createElement('loader-element');
  loader.classList.add('loader');

  return loader;
}
