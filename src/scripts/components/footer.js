import LogoImg from '../../assets/logo.png';

export function renderFooter() {
  return `
      <div class=" container footer-top">
        <div class="footer-brand">
          <img src="${LogoImg}" alt="Logo e-Syarat" class="logo-img" />
          <div>
            <span class="logo-text-footer"><strong>e-Syarat</strong></span>
            <p class="footer-desc">Membuat pembelajaran bahasa isyarat dapat diakses oleh semua orang.</p>
          </div>
        </div>
        <div class="footer-links">
          <div>
            <h4>Belajar</h4>
            <a href="#">Kursus</a>
            <a href="#/practice">Latihan</a>
            <a href="#/dictionary">Kamus</a>
            <a href="#">Sumber Daya</a>
          </div>
          <div>
            <h4>Perusahaan</h4>
            <a href="#/about">Tentang</a>
            <a href="#">Karier</a>
            <a href="#">Blog</a>
            <a href="#">Kontak</a>
          </div>
          <div>
            <h4>Terhubung</h4>
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
        <span>&copy; 2025 e-Syarat. Hak cipta dilindungi undang-undang.</span>
      </div>
  `;
}
