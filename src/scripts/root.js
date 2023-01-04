import { LitElement } from 'lit';
import theme from '@utils/theme';
import Route from '@routes/route';
import WatchJS from 'melanke-watchjs';

class RootComponent extends LitElement {
  static properties = {
    page: { attribute: false },
  };

  constructor() {
    super();
    this.page = Route.getPage();
    const { watch } = WatchJS;

    watch(Route, 'location', () => {
      this.page = Route.getPage();
    });
  }

  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    theme.init();
  }

  render() {
    return this.page.render();
  }
}

customElements.define('root-component', RootComponent);
