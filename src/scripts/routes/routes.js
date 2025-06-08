// router.js
import HomePresenter from '../pages/home/home-presenter.js';
import LoginPresenter from '../pages/auth/login/login-presenter.js';
import RegisterPresenter from '../pages/auth/register/register-presenter.js';
import PracticePresenter from '../pages/practice/practice-presenter.js';
import AboutPresenter from '../pages/about/about-presenter.js';
import AlphabetPresenter from '../pages/dictionary/alphabet/alphabet-presenter.js';
import NumbersPresenter from '../pages/dictionary/numbers/numbers-presenter.js';
import DailyWordsPresenter from '../pages/dictionary/daily-words/dailyWords-presenter.js';

export default class Router {
  constructor(root) {
    this.root = root;
    this.routes = {
      '#/': () => new HomePresenter(this.root),
      '#/home': () => new HomePresenter(this.root),
      '#/login': () => new LoginPresenter(this.root),
      '#/register': () => new RegisterPresenter(this.root),
      '#/practice': () => new PracticePresenter(this.root),
      '#/about': () => new AboutPresenter(this.root),
      '#/dictionary/alphabet': () => new AlphabetPresenter(this.root),
      '#/dictionary/numbers': () => new NumbersPresenter(this.root),
      '#/dictionary/daily-words': () => new DailyWordsPresenter(this.root),
    };

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  handleRoute() {
    const hash = window.location.hash || '#/';
    if (hash === '#/dictionary') {
      window.location.hash = '#/dictionary/alphabet';
      return;
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const publicRoutes = ['#/', '#/home', '#/login', '#/register', '#/about'];
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
    const hash = window.location.hash;
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (
        (href === '#/dictionary' && hash.startsWith('#/dictionary')) ||
        (href === '#/practice' && hash.startsWith('#/practice')) ||
        href === hash
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
