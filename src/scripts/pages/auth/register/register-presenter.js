import RegisterPage from "./register-page.js";
import RegisterModel from "./register-model.js";

export default class RegisterPresenter {
  constructor(root) {
    this.model = new RegisterModel();
    this.view = new RegisterPage(root, this.handleRegister.bind(this));
  }

  init() {
    this.view.render();
  }

  async handleRegister(fullname, email, password) {
    const result = await this.model.register(fullname, email, password);
    this.view.showMessage(result.message, result.success);
    if (result.success) {
      this.view.onRegisterSuccess();
    }
  }
}
