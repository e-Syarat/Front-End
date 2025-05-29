import './styles/styles.css';
import './styles/responsive.css';
import './index.html';

import HomePresenter from './scripts/pages/home/home-presenter.js';
import LoginPresenter from './scripts/pages/auth/login/login-presenter.js';
import Router from './scripts/routes/routes.js';
const root = document.getElementById('app');
const router = new Router(root); 