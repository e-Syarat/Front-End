import LogoImg from "../../../assets/logo.png";
import HeroImg from "../../../assets/e-syarat.png";
import { renderNavbar } from '../../components/navbar.js';
// View untuk Homepage (MVP Pattern)

export default class HomePage {
  constructor(root) {
    this.root = root;
  }

  render({ hero, features, stats, testimonials }) {
    this.root.innerHTML = `
      
      <section class="hero">
        <div class=" container hero-content">
          <h1>${hero.title}</h1>
          <p>${hero.description}</p>
          <div class="cta-buttons">
            <a href="#/practice" class="btn">Mulai Belajar</a>
            ${hero.cta
        .filter((btn) => btn.text !== "Start Learning")
        .map(
          (btn) =>
            `<a href="${btn.link}" class="btn-outline">${btn.text}</a>`
        )
        .join(" ")}
          </div>
        </div>
        <div class="hero-image">
          <img src="${HeroImg}" alt="Sign Language Group" />
        </div>
      </section>
      <section class="features">
        <h2>Mengapa Belajar dengan e-Syarat?</h2>
        <div class="container feature-list">
          ${features
        .map(
          (f) => `
            <div class="feature-item">
              <span class="feature-icon"><img src="${f.icon}" alt="icon"/></span>
              <h3>${f.title}</h3>
              <p>${f.description}</p>
            </div>
          `
        )
        .join("")}
        </div>
      </section>
      <section class="stats">
        <div class="stat-list">
          ${stats
        .map(
          (s) => `
            <div class="stat-item">
              <span class="stat-value">${s.value}</span>
              <span class="stat-label">${s.label}</span>
            </div>
          `
        )
        .join("")}
        </div>
      </section>
      <section class="cta-banner">
        <h2>Mulai Perjalanan Bahasa Isyaratmu Hari Ini</h2>
        <p>Bergabunglah bersama ribuan pembelajar yang menguasai bahasa isyarat dengan platform interaktif kami. Mulai uji coba gratis sekarang!</p>
        <div class="cta-buttons">
          <a href="#" class="btn">Mulai Uji Coba Gratis</a>
          <a href="#" class="btn-outline">Lihat Paket</a>
        </div>
      </section>
      <section class="testimonials">
        <h2>Apa Kata Pengguna Kami</h2>
        <div class="container testimonial-list">
          ${testimonials
        .map(
          (t) => `
            <div class="testimonial-item">
              <div class="testimonial-avatar"><img src="${t.avatar}" alt="avatar"/></div>
              <div class="testimonial-content">
                <strong>${t.name}</strong><br> 
                <span>${t.role}</span>
                <p>"${t.text}"</p>
              </div>
            </div>
          `
        )
        .join("")}
        </div>
      </section>
    `;
  }
}
