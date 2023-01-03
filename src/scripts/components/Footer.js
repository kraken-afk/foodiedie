import { LitElement, html } from 'lit';

class Footer extends LitElement {
  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      const btn = document.getElementById('theme-btn');
      btn.addEventListener('click', () => {
        const { body } = document;

        if (body.classList.contains('light')) {
          body.classList.replace('light', 'dark');
        } else {
          body.classList.replace('dark', 'light');
        }
      });
    }, 0);
  }

  render() {
    return html`
      <footer class="footer" tabindex="0">
        <button aria-disabled="true" id="theme-btn" class="theme-light">👁‍🗨</button>
        <p>Copyright <span aria-disabled="true" aria-hidden="true">&#169;</span> <span>${new Date().getFullYear()}</span> code and design by Romeo Noveanre.</p>
      </footer>
    `;
  }
}

customElements.define('footer-element', Footer);
