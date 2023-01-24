import { html } from 'lit';

export default class ReviewForm {
  constructor(submitHandler) {
    this.submitHandler = submitHandler;
  }

  render() {
    return html`
      <form @submit=${this.submitHandler} action="POST" class="form-review">
      <span class="form-title">Add review</span>
        <div class="input-wrapper">
          <input required type="text" id="name" placeholder="Your name.."/>
        </div>
        <div class="input-wrapper-textarea">
          <textarea required placeholder="Review.." id="review" name="review" cols="50" rows="5"></textarea>
        </div>
        <button class="submit-btn">Submit</button>
      </form>
    `;
  }
}
