import { LitElement } from 'lit';
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

  render() {
    return this.currentRoute.render();
  }
}

customElements.define('root-component', RootComponent);
