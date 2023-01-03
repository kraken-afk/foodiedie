import { LitElement } from 'lit';
import theme from '../utils/theme';
import HomeComponent from './Home';

class RootComponent extends LitElement {
  static properties = {
    currentRoute: { attribute: false },
  };

  constructor() {
    super();

    this.currentRoute = new HomeComponent();
  }

  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    theme.init();
  }

  render() {
    return this.currentRoute.render();
  }
}

customElements.define('root-component', RootComponent);
