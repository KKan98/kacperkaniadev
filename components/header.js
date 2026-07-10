const headerTemplate = document.createElement('template');
const BASE = location.hostname === "kkan98.github.io" ? "/kacperkaniadev" : "";

headerTemplate.innerHTML = `
  <style>
    header {
      background-color: var(--bg-header);
    }
      
    navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 32px;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    navbar p {
      color: var(--bright);
    }

    nav {
      display: flex;
      gap: 24px;
    }

    nav a {
      color: var(--muted);
      text-decoration: none;
    }

    nav a:hover {
      color: white;
    }
  </style>
  <header>
    <navbar>
      <p>Kacper Kania</p>
      <nav>
        <a href="${BASE}/index.html">Home</a>
        <a href="${BASE}/about.html">About</a>
      </nav>
    </navbar>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);
