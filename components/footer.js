import { getCurrentYear } from "../utils/date.js"

const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
  <style>
    footer {
      margin: auto;
      text-align: center;
      line-height: 28px;
    }
    
    footer p {
      color: var(--muted);
      font-size: 12px;
    }
  </style>
  <footer>
    <p>© ${getCurrentYear()} Kacper Kania</p>
  </footer>
  
`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);
