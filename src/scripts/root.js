import { LitElement } from 'lit';
import theme from '@utils/theme';
import Route from '@routes/route';
import '@scss/template.scss';

class RootComponent extends LitElement {
  static properties = {
    page: { attribute: false },
  };

  constructor() {
    super();
    this.page = Route.getPage();
  }

  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    theme.init();

    Route.onchange(() => {
      this.page = Route.getPage();
    });
  }

  render() {
    return this.page.render();
  }
}

customElements.define('root-component', RootComponent);
