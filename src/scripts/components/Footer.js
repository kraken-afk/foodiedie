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
        <button @click=${this.themeClickHandler} aria-disabled="true" aria-label="switch visual theme" id="theme-btn" class="theme-light">
          <svg xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24' fill='#000000'
            width='24' height='24'>
            <path
              d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z">
            </path>
          </svg>
        </button>
        <p>Copyright <span aria-disabled="true" aria-hidden="true">&#169;</span> <span>${new Date().getFullYear()}</span> code and design by Romeo Noveanre.</p>
      </footer>
    `;
  }
}

customElements.define('footer-element', Footer);
