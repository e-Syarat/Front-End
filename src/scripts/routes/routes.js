// router.js
import HomePresenter from '../pages/home/home-presenter.js';
import LoginPresenter from '../pages/auth/login/login-presenter.js';
import RegisterPresenter from '../pages/auth/register/register-presenter.js';
import PracticePresenter from '../pages/practice/practice-presenter.js';

export default class Router {
  constructor(root) {
    this.root = root;
    this.routes = {
      '#/': () => new HomePresenter(this.root),
      '#/home': () => new HomePresenter(this.root),
      '#/login': () => new LoginPresenter(this.root),
      '#/register': () => new RegisterPresenter(this.root),
      '#/practice': () => new PracticePresenter(this.root),
    };

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  handleRoute() {
    const hash = window.location.hash || '#/';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const publicRoutes = ['#/', '#/home', '#/login', '#/register'];
    if (!isLoggedIn && !publicRoutes.includes(hash)) {
      window.location.hash = '#/login';
      return;
    }
    const routeHandler = this.routes[hash];
    console.log('[Router] Navigating to:', hash);
    if (routeHandler) {
      const presenter = routeHandler();
      presenter.init();
      this.updateActiveNav();
    } else {
      this.root.innerHTML = `<h2>404 - Page not found</h2>`;
    }
  }

  updateActiveNav() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
