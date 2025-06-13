export default class DailyWordsPage {
  constructor(root) {
    this.root = root;
    this.onSearch = null;
  }

  showLoading() {
    this.root.innerHTML = "<p>Loading...</p>";
  }

  render(data, query = "") {
    // Tampilkan coming soon
    this.root.innerHTML = `
      <main class="dictionary-main">
        <h1 class="dictionary-title">Jelajahi Kamus Bahasa Isyarat</h1>
        <p class="dictionary-desc">Telusuri gerakan untuk huruf, angka, dan kata sehari-hari.</p>
        <div class="dictionary-tabs-search">
          <div class="dictionary-tabs">
            <a href="#/dictionary/alphabet" class="dictionary-tab">Alfabet</a>
            <a href="#/dictionary/numbers" class="dictionary-tab">Angka</a>
            <a href="#/dictionary/daily-words" class="dictionary-tab active">Kata Sehari-hari</a>
          </div>
        </div>
        <div style="text-align: center; padding: 40px 20px;">
          <h2 style="font-size: 24px; color: #1e3a8a; margin-bottom: 16px;">Segera Hadir!</h2>
          <p style="color: #666; margin-bottom: 24px;">Fitur kata sehari-hari sedang dalam pengembangan.</p>
        </div>
      </main>
    `;

    /* Kode asli yang dijadikan komentar
    this.root.innerHTML = `
      <main class="dictionary-main">
        <h1 class="dictionary-title">Jelajahi Kamus Bahasa Isyarat</h1>
        <p class="dictionary-desc">Telusuri gerakan untuk huruf, angka, dan kata sehari-hari.</p>
        <div class="dictionary-tabs-search">
          <div class="dictionary-tabs">
            <a href="#/dictionary/alphabet" class="dictionary-tab">Alfabet</a>
            <a href="#/dictionary/numbers" class="dictionary-tab">Angka</a>
            <a href="#/dictionary/daily-words" class="dictionary-tab active">Kata Sehari-hari</a>
          </div>
          <input type="search" class="dictionary-search" placeholder="Cari huruf, angka, atau kata..." value="${query || ""}" />
        </div>
        <div class="dictionary-grid">
          ${data
            .map(
              (item) => `
            <div class="dictionary-card">
              <div class="dictionary-img-box">
                <img src="${item.image}" alt="Sign for ${item.word}" class="dictionary-img" />
              </div>
              <div class="dictionary-label">${item.word}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </main>
    `;

    this._setupEventListeners();
    */
  }

  _setupEventListeners() {
    /* Kode asli yang dijadikan komentar
    const input = this.root.querySelector(".dictionary-search");
    input.addEventListener("input", () => {
      if (this.onSearch) {
        this.onSearch(input.value.trim());
      }
    });
    */
  }
}
