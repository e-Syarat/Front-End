import LogoImg from "../../assets/logo.png";

export function renderNavbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return `
      <a href="#/home" class="logo">
        <img src="${LogoImg}" alt="e-Syarat Logo" class="logo-img" />
        <span class="logo-text"><strong>e-Syarat</strong></span>
      </a>
      <nav class="main-nav" id="main-nav">
        <a href="#/home" class="nav-link">Home</a>
        <a href="#/practice" class="nav-link">Practice</a>
        <a href="#/dictionary" class="nav-link">Dictionary</a>
        <a href="#/about" class="nav-link">About</a>
      </nav>
      ${
        isLoggedIn
          ? '<a href="#" class="btn login-btn" id="logout-btn">Logout</a>'
          : '<a href="#/login" class="btn login-btn">Login</a>'
      }
  `;
}

// Setup event hanya sekali
let navbarEventsSetup = false;
export function setupNavbarEvents() {
  if (navbarEventsSetup) return;
  navbarEventsSetup = true;
  const btn = document.getElementById("hamburger-btn");
  const nav = document.getElementById("main-nav");
  if (btn && nav) {
    btn.onclick = () => {
      nav.classList.toggle("open");
      btn.classList.toggle("open");
    };
  }
  document.addEventListener("click", logoutHandler);
}

function logoutHandler(e) {
  if (e.target && e.target.id === "logout-btn") {
    localStorage.removeItem("isLoggedIn");
    window.location.hash = "#/login";
  }
}
