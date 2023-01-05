import { html } from "lit";

export default class CommentSection {
  constructor(data) {
    this.data = data;
  }

  render() {

    return html`
    <div class="comment-section-container">
      ${this.data.map(({ name, date, review }) => {
        return html`
          <div class="comment-section">
            <div class="comment-section__header">
              <span class="comment-section__header__name truncate-one">${name}</span>
              <sup class="comment-section__header__date">${date}</sup>
            </div>
            <p class="comment-section__review">${review}</p>
          </div>
        `;
      })}
    </div>`;
  }
}