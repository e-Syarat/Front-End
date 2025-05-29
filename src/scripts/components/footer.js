import LogoImg from '../../assets/logo.png';

export function renderFooter() {
  return `
      <div class=" container footer-top">
        <div class="footer-brand">
          <img src="${LogoImg}" alt="e-Syarat Logo" class="logo-img" />
          <div>
            <span class="logo-text-footer"><strong>e-Syarat</strong></span>
            <p class="footer-desc">Making sign language learning accessible to everyone.</p>
          </div>
        </div>
        <div class="footer-links">
          <div>
            <h4>Learn</h4>
            <a href="#">Courses</a>
            <a href="#">Practice</a>
            <a href="#/dictionary">Dictionary</a>
            <a href="#">Resources</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#/about">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Connect</h4>
            <div class="footer-socials">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f footer-social-icon"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter footer-social-icon"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram footer-social-icon"></i></a>
              <a href="#" aria-label="YouTube"><i class="fab fa-youtube footer-social-icon"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>&copy; 2025 e-Syarat. All rights reserved.</span>
      </div>
  `;
}
