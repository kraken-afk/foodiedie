import { LitElement } from 'lit';
import theme from '@utils/theme';
import Route from '@routes/route';
import swalInit from '@utils/swalInit';
import '@scss/template.scss';

class RootComponent extends LitElement {
  static properties = {
    page: { attribute: false },
  };

  constructor() {
    super();
    this.page = Route.getPage();
    this.isOnline = navigator.onLine;
  }

  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    theme.init();
    swalInit();

    Route.onchange(async () => {
      this.page = await Route.getPage();
    });
  }

  render() {
    return this.page.render();
  }
}

customElements.define('root-component', RootComponent);
