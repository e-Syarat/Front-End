export default class PaymentPage {
    constructor(root) {
        this.root = root;
    }

    render() {
        // Ambil paket dari hash
        const hash = window.location.hash;
        const paketMatch = hash.match(/paket=([^&]+)/);
        let paket = paketMatch ? paketMatch[1] : 'free';
        let title = '', price = '', desc = '', note = '', duration = '';
        if (paket === 'pro') {
            title = 'Pro';
            price = 'Rp 60.000';
            duration = '/3 bulan';
            desc = 'Akses penuh fitur premium & kemajuan belajar optimal.';
            note = 'Pembayaran berlaku untuk 3 bulan.';
        } else if (paket === 'plus') {
            title = 'Plus';
            price = 'Rp 25.000';
            duration = '/bulan';
            desc = 'Fitur lebih lengkap untuk pembelajaran lebih interaktif.';
            note = 'Pembayaran berlaku untuk 1 bulan.';
        } else {
            title = 'Free';
            price = 'Rp 0';
            duration = '/bulan';
            desc = 'Cocok untuk pemula yang ingin mencoba fitur dasar.';
            note = 'Tidak perlu pembayaran.';
        }
        this.root.innerHTML = `
      <section class="payment-section">
        <div class="payment-card">
          <h2>Pembayaran Paket <span class="payment-title">${title}</span></h2>
          <div class="payment-info">
            <div class="payment-price">${price}<span class="payment-duration">${duration}</span></div>
            <div class="payment-desc">${desc}</div>
            <div class="payment-note">${note}</div>
          </div>
          ${paket !== 'free' ? `<button class="btn payment-btn">Konfirmasi & Bayar</button>` : ''}
          <a href="#/paket" class="payment-back">Kembali ke Pilihan Paket</a>
        </div>
      </section>
    `;
    }
} 