import { LitElement, html, css } from 'lit';

class Loader extends LitElement {
  static styles = css`
  .loader {
    --size: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.6rem;
  }

  .box {
    width: var(--size);
    height: var(--size);
    background: #2e8b57;
    animation: rotate 2s infinite;
  }

  .box:nth-child(2) {
   animation-delay: 0.25s;
  }

  .box:nth-child(3) {
    animation-delay: 0.5s;
  }

  @keyframes rotate {
    50% {
      transform: rotate(180deg)
    }
  }
  `;

  render() {
    return html`
    <div class="loader">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
    `;
  }
}

customElements.define('loader-element', Loader);
