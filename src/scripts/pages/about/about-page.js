export default class AboutPage {
  constructor(root) {
    this.root = root;
  }

  render(data) {
    this.root.innerHTML = `
      <main class="about-main">
        <section class="about-hero">
          <div class="about-hero-text">
            <h1 class="about-title"><i class="fas fa-sign-language"></i> e-<strong>Syarat</strong></h1>
            <p class="about-desc">${data.description}</p>
          </div>
          <div class="about-hero-img">
            <img src="/src/assets/about-hero.png" alt="People illustration" class="about-hero-illustration" />
          </div>
        </section>
        <section class="about-mission-vision">
          <h2 class="about-section-title">Misi & Visi Kami</h2>
          <div class="about-mv-cards">
            <div class="about-mv-card mission">
              <div class="about-mv-icon"><i class="fas fa-bullseye"></i></div>
              <h3>Misi</h3>
              <p>${data.mission}</p>
            </div>
            <div class="about-mv-card vision">
              <div class="about-mv-icon"><i class="fas fa-eye"></i></div>
              <h3>Visi</h3>
              <p>${data.vision}</p>
            </div>
          </div>
        </section>
        <section class="about-team">
          <h2 class="about-section-title">Tim Kami</h2>
          <div class="about-team-cards">
            ${data.team
              .map(
                (member) => `
              <div class="about-team-card">
                <img src="${member.photo}" alt="${member.name}" class="about-team-photo" />
                <h4>${member.name}</h4>
                <span class="about-team-role">${member.role}</span>
                <p class="about-team-desc">${member.desc}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </section>
        <section class="about-cta">
          <h2 class="about-section-title">Bergabunglah Bersama Kami</h2>
          <p>Jadilah bagian dari gerakan ini. Apakah Anda pelajar, pendidik, atau pendukung, kontribusi Anda sangat berarti.</p>
          <div class="about-cta-btns">
            <a href="#/practice" class="btn btn-primary">Mulai Belajar</a>
            <a href="#/contact" class="btn btn-outline">Hubungi Kami</a>
          </div>
        </section>
      </main>
    `;
  }
}
