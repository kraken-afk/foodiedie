import { LitElement, html } from "lit";
import "./CardModal";
import mapSvg from "../../public/images/bx-map.svg";
import starSvg from "../../public/images/bxs-star.svg";
import data from "../../DATA.json";

class RestaurantCard extends LitElement {
  constructor() {
    super();
    this._id = this.getAttribute("_id") ?? null; 
  }

  static get properties () {
    return {
      _id: {type: String, attribute: true}
    }
  }

  createRenderRoot() {return this}

  get data() {
    const { restaurants  } = data;
    return restaurants.find(e => e.id === this._id);
  }

  readMoreClickHanlder(event) {
    const modal = document.createElement("card-modal") ;
    const blur = document.createElement("div");

    blur.setAttribute("class", "blured");
    modal.setAttribute("_id", this._id);

    document.body.insertBefore(blur, document.body.firstChild);
    document.body.insertBefore(modal, document.body.firstChild);
    document.body.style.overflow = "hidden";

  }

  render() {
    if (!this._id) throw new TypeError("'_id' attribute cannot be empty");
    const {name, description, city, pictureId: source, rating} = this.data;

    return html`
      <div class="card" tabindex="0">
        <figure class="card__img">
          <img src=${source} alt="${name} image," />
          <span aria-label=${"rating: " + rating + " star,"} class="card__rating"> <img width="18" src=${starSvg} alt="" /> ${rating}</span>
        </figure>
        <article class="card__description">
          <div class="card__header">
            <h3>${name}</h3>
            <span aria-label=${"placed at " + city + ","} class="card__city"> <img width="18" src=${mapSvg} alt="" /> ${city}</span> 
          </div>
          <p class="truncate">${description}</p>
          <button @click=${this.readMoreClickHanlder} aria-hidden="true" aria-disabled class="card__button">read more...</button>
          </article>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCard);