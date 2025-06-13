import LogoImg from "../../assets/logo.png";
import Facebook from "../../assets/icon/facebook.png";
import Twitter from "../../assets/icon/twitter.png";
import Instagram from "../../assets/icon/instagram.png";
import Youtube from "../../assets/icon/youtube.png";

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
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="${Facebook}" alt="Facebook" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="${Twitter}" alt="Twitter" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="${Instagram}" alt="Instagram" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="${Youtube}" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>&copy; ${new Date().getFullYear()} e-Syarat. Hak cipta dilindungi undang-undang.</span>
      </div>
  `;
}
