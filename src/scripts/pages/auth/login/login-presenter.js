// Presenter untuk Login Page (MVP Pattern)
import LoginModel from './login-model.js';
import LoginPage from './login-page.js';

export default class LoginPresenter {
  constructor(root) {
    this.model = new LoginModel();
    this.view = new LoginPage(root, this.handleLogin.bind(this));
  }

  init() {
    this.view.render();
  }

  handleLogin(email, password) {
    const result = this.model.login(email, password);
    this.view.showMessage(result.message, result.success);
    if (result.success) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.hash = '#/home';
    }
  }
}
