export default class AlphabetPage {
  constructor(root) {
    this.root = root;
    this.onSearch = null;
    this.data = [];
    this.originalData = [];
  }

  showLoading() {
    this.root.innerHTML = `
      <main class="dictionary-main">
        <h1 class="dictionary-title">Jelajahi Kamus Bahasa Isyarat</h1>
        <p class="dictionary-desc">Telusuri gerakan untuk huruf, angka, dan kata sehari-hari.</p>
        <div class="dictionary-tabs-search">
          <div class="dictionary-tabs">
            <a href="#/dictionary/alphabet" class="dictionary-tab active">Alfabet</a>
            <a href="#/dictionary/numbers" class="dictionary-tab">Angka</a>
            <a href="#/dictionary/daily-words" class="dictionary-tab">Kata Sehari-hari</a>
          </div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; min-height: 300px;">
          <div class="loader"></div>
        </div>
      </main>
    `;
  }

  render(data, query = "") {
    this.data = data;
    if (!this.originalData.length) this.originalData = data; // Simpan data asli

    this.root.innerHTML = `
      <main class="dictionary-main">
        <h1 class="dictionary-title">Jelajahi Kamus Bahasa Isyarat</h1>
        <p class="dictionary-desc">Telusuri gerakan untuk huruf, angka, dan kata sehari-hari.</p>
        <div class="dictionary-tabs-search">
          <div class="dictionary-tabs">
            <a href="#/dictionary/alphabet" class="dictionary-tab active">Alfabet</a>
            <a href="#/dictionary/numbers" class="dictionary-tab">Angka</a>
            <a href="#/dictionary/daily-words" class="dictionary-tab">Kata Sehari-hari</a>
          </div>
          <input type="search" class="dictionary-search" placeholder="Cari huruf, angka, atau kata..." value="${query || ""
      }" />
        </div>
        <div class="dictionary-grid">
          ${data
        .map(
          (item) => `
            <div class="dictionary-card">
              <div class="dictionary-img-box">
                <img src="${item.image}" alt="Sign for ${item.letter}" class="dictionary-img" />
              </div>
              <div class="dictionary-label">${item.letter}</div>
            </div>
          `
        )
        .join("")}
        </div>
      </main>
    `;

    this._setupEventListeners();
  }

  _setupEventListeners() {
    const input = this.root.querySelector(".dictionary-search");
    input.addEventListener("input", () => {
      if (this.onSearch) {
        this.onSearch(input.value.trim());
      }
    });
  }
}
