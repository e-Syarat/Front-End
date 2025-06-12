export default class PaketPage {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = `
      <section class="paket-section">
        <h2 class="paket-title">Pilih Paket</h2>
        <div class="paket-cards pricing-style">
          <div class="paket-card pricing-card free">
            <div class="pricing-header">
              <h3 class="pricing-title">Free</h3>
              <div class="pricing-price">Rp 0<span class="pricing-duration">/bulan</span></div>
            </div>
            <div class="pricing-desc">Cocok untuk pemula yang ingin mencoba fitur dasar.</div>
            <ul class="pricing-features">
              <li>Fitur dasar deteksi objek/isyarat</li>
              <li>5 mini games edukatif</li>
              <li>Akses leaderboard mingguan</li>
            </ul>
            <a href="#/payment?paket=free" class="btn pricing-btn">Pilih Paket</a>
          </div>
          <div class="paket-card pricing-card plus highlight">
            <div class="pricing-label">POPULAR</div>
            <div class="pricing-header">
              <h3 class="pricing-title">Plus</h3>
              <div class="pricing-price">Rp 25.000<span class="pricing-duration">/bulan</span></div>
            </div>
            <div class="pricing-desc">Fitur lebih lengkap untuk pembelajaran lebih interaktif.</div>
            <ul class="pricing-features">
              <li>Semua fitur Free</li>
              <li>Tantangan harian/mingguan</li>
              <li>Progress tracker (kemajuan belajar)</li>
              <li>Rekomendasi materi otomatis</li>
            </ul>
            <a href="#/payment?paket=plus" class="btn pricing-btn">Pilih Paket</a>
          </div>
          <div class="paket-card pricing-card pro">
            <div class="pricing-header">
              <h3 class="pricing-title">Pro</h3>
              <div class="pricing-price">Rp 60.000<span class="pricing-duration">/3 bulan</span></div>
            </div>
            <div class="pricing-desc">Akses penuh fitur premium & kemajuan belajar optimal.</div>
            <ul class="pricing-features">
              <li>Semua fitur Plus</li>
              <li>Badge & sertifikat digital setelah menyelesaikan level</li>
              <li>Prioritas support</li>
            </ul>
            <a href="#/payment?paket=pro" class="btn pricing-btn">Pilih Paket</a>
          </div>
        </div>
      </section>
    `;
    }
} 