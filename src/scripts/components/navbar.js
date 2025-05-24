import LogoImg from '../../assets/logo.png';

export function renderNavbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return `
    <header class="main-header">
      <a href="#/home" class="logo">
        <img src="${LogoImg}" alt="e-Syarat Logo" class="logo-img" />
        <span class="logo-text">e-<strong>Syarat</strong></span>
      </a>
      <nav class="main-nav">
        <a href="#/home" class="nav-link">Home</a>
        <a href="#/practice" class="nav-link">Practice</a>
        <a href="#/dictionary" class="nav-link">Dictionary</a>
        <a href="#/about" class="nav-link">About</a>
      </nav>
      ${isLoggedIn
      ? '<a href="#" class="btn login-btn" id="logout-btn">Logout</a>'
      : '<a href="#/login" class="btn login-btn">Login</a>'}
    </header>
  `;
}

// Tambahkan event listener logout setelah renderNavbar dipanggil
document.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'logout-btn') {
    localStorage.removeItem('isLoggedIn');
    window.location.hash = '#/login';
  }
});
