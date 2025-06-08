export default class AlphabetPage {
  constructor(root) {
    this.root = root;
    this.onSearch = null;
    this.data = [];
  }

  render(data, query = "") {
    this.data = data;
    this.root.innerHTML = `
      <main class="dictionary-main">
        <h1 class="dictionary-title">Explore Sign Language Dictionary</h1>
        <p class="dictionary-desc">Browse gestures for letters, numbers, and common words.</p>
        <div class="dictionary-tabs-search">
          <div class="dictionary-tabs">
            <a href="#/dictionary/alphabet" class="dictionary-tab active">Alphabet</a>
            <a href="#/dictionary/numbers" class="dictionary-tab">Numbers</a>
            <a href="#/dictionary/daily-words" class="dictionary-tab">Daily Words</a>
          </div>
          <input type="search" class="dictionary-search" placeholder="Search letter, number, or word..." value="${
            query || ""
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
    const input = this.root.querySelector(".dictionary-search");
    input.value = query;
    input.addEventListener("input", () => {
      if (input.value === "" && this.onSearch) {
        this.onSearch("");
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && this.onSearch) {
        this.onSearch(input.value);
      }
    });
    input.addEventListener("search", () => {
      if (this.onSearch) {
        this.onSearch(input.value);
      }
    });
  }
}
