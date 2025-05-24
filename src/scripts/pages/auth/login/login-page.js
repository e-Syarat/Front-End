// login-page.js
import { renderNavbar } from '../../../components/navbar.js';
import { renderFooter } from '../../../components/footer.js';
import LoginIllustration from '../../../../assets/login-illustration.png';

export default class LoginPage {
  constructor(root, onLoginSubmit) {
    this.root = root;
    this.onLoginSubmit = onLoginSubmit;
  }

  render() {
    this.root.innerHTML = `
      ${renderNavbar()}
      <section class="login-page">
        <div class="login-card">
          <h2>Welcome Back to <span class="brand">e-Syarat</span></h2>
          <p class="subtitle">Log in to continue your sign language learning journey.</p>
          <form id="login-form">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="you@email.com" required />

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />

            <button type="submit" class="btn">Login</button>
          </form>
          <div class="login-links">
            <a href="#">Forgot Password?</a>
            <p>Don't have an account? <a href="#/register" class="signup-link">Sign Up</a></p>
          </div>
        </div>
        <div class="login-illustration">
          <img src="${LoginIllustration}" alt="Login Illustration" />
        </div>
      </section>
      ${renderFooter()}
    `;

    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      this.root.classList.add('fade-out');
      setTimeout(() => {
        this.onLoginSubmit(email, password);
        this.root.classList.remove('fade-out');
      }, 400);
    });
  }

  showMessage(message, success = true) {
    alert(message); // Ganti dengan custom alert jika ingin
  }
}
