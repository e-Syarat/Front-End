// Presenter untuk Login Page (MVP Pattern)
import LoginModel from "./login-model.js";
import LoginPage from "./login-page.js";

export default class LoginPresenter {
  constructor(root) {
    this.model = new LoginModel();
    this.view = new LoginPage(root);
    this.view.onLoginSubmit = this.handleLogin.bind(this);
    this.view.onLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  init() {
    this.view.render();
  }

  // handleLogin integrasi API
  async handleLogin(email, password) {
    const result = await this.model.login(email, password);
    this.view.showMessage(result.message, result.success);
    if (result.success && this.view.onLoginSuccess) {
      this.view.onLoginSuccess();
    }
  }

  handleLoginSuccess() {
    // Kosong, biar view yang handle redirect dan localStorage
  }
}
