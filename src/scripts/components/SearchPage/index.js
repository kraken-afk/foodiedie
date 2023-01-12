import { html } from 'lit';
import './SearchResult';

export default class SearchPageComponent {
  constructor(query) {
    this.query = query;
  }

  render() {
    return html`
    <nav-bar></nav-bar>
    <search-result query=${this.query}></search-result>
    `;
  }
}