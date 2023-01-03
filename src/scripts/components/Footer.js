import { LitElement, html } from 'lit';

class Footer extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <footer class="footer" tabindex="0">
        <p>Copyright <span aria-disabled="true" aria-hidden="true">&#169;</span> <span>${new Date().getFullYear()}</span> code and design by Romeo Noveanre.</p>
      </footer>
    `;
  }
}

customElements.define('footer-element', Footer);
