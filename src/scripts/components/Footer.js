import { LitElement, html } from 'lit';
import theme from '../utils/theme';

class Footer extends LitElement {
  createRenderRoot() { return this; }

  themeClickHandler(event) {
    event.stopPropagation();
    const { body } = document;

    if (body.classList.contains('light')) {
      body.classList.replace('light', 'dark');
      theme.changeHandler('dark');
    } else {
      body.classList.replace('dark', 'light');
      theme.changeHandler('light');
    }
  }

  render() {
    return html`
      <footer class="footer" tabindex="0">
        <button @click=${this.themeClickHandler} aria-disabled="true" id="theme-btn" class="theme-light">🔆</button>
        <p>Copyright <span aria-disabled="true" aria-hidden="true">&#169;</span> <span>${new Date().getFullYear()}</span> code and design by Romeo Noveanre.</p>
      </footer>
    `;
  }
}

customElements.define('footer-element', Footer);
