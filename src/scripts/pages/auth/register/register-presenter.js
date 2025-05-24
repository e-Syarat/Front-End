import RegisterPage from './register-page.js';

export default class RegisterPresenter {
    constructor(root) {
        this.view = new RegisterPage(root, this.handleRegister.bind(this));
    }

    init() {
        this.view.render();
    }

    handleRegister(fullname, email, password) {
        // Simulasi register, bisa dihubungkan ke backend nanti
        if (fullname && email && password) {
            this.view.showMessage('Registration successful!', true);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.hash = '#/home';
        } else {
            this.view.showMessage('Please fill all fields.', false);
        }
    }
}
