import { html } from 'lit';
import './Detail';
import '@scss/detail-page.scss';

export default class DetailComponent {
  constructor(id) {
    this.code = id;
  }

  render() {
    return html`
    <nav-bar></nav-bar>
    <detail-page class="detail" code="${this.code}"></detail-page>
    `;
  }
}
