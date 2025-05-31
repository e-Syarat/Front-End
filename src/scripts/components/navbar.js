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
        ${isLoggedIn
      ? '<a href="#" class="btn login-btn" id="logout-btn">Logout</a>'
      : '<a href="#/login" class="btn login-btn">Login</a>'
    }
      </nav>
      <button id="hamburger-btn" class="hamburger" aria-label="Menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
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
    btn.onclick = (e) => {
      e.stopPropagation();
      nav.classList.toggle("open");
      btn.classList.toggle("open");
    };
    // Tutup menu jika klik di luar nav saat open (mobile)
    document.addEventListener("click", (e) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        e.target !== btn
      ) {
        nav.classList.remove("open");
        btn.classList.remove("open");
      }
    });
  }
  document.addEventListener("click", logoutHandler);
}

function logoutHandler(e) {
  if (e.target && e.target.id === "logout-btn") {
    localStorage.removeItem("isLoggedIn");
    window.location.hash = "#/home";
  }
}
