import { renderNavbar } from '../../../components/navbar.js';
import { renderFooter } from '../../../components/footer.js';
import SignupImg from '../../../../assets/signup.png';

export default class RegisterPage {
    constructor(root, onRegisterSubmit) {
        this.root = root;
        this.onRegisterSubmit = onRegisterSubmit;
    }

    render() {
        this.root.innerHTML = `
      ${renderNavbar()}
      <section class="login-page">
        <div class="login-illustration">
          <img src="${SignupImg}" alt="Sign Up Illustration" />
        </div>
        <div class="login-card">
          <h2 style="color:#1e3a8a; font-size:2rem; margin-bottom:8px;">Create Your Account</h2>
          <p class="subtitle">Start your sign language journey with e-Syarat.</p>
          <form id="register-form">
            <label for="fullname">Full Name</label>
            <input type="text" id="fullname" placeholder="Your full name" required />

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" required />

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />

            <button type="submit" class="btn">Sign Up</button>
          </form>
          <div class="login-links">
            <p>Already have an account? <a href="#/login" class="signup-link">Login</a></p>
          </div>
        </div>
      </section>
      ${renderFooter()}
    `;

        const form = document.getElementById('register-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = form.fullname.value;
            const email = form.email.value;
            const password = form.password.value;
            this.onRegisterSubmit(fullname, email, password);
        });
    }

    showMessage(message, success = true) {
        alert(message);
    }
}
