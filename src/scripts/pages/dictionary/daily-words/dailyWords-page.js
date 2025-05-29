export function renderDailyWordsPage(data, query = "") {
  return `
    <main class="dictionary-main">
      <h1 class="dictionary-title">Explore Sign Language Dictionary</h1>
      <p class="dictionary-desc">Browse gestures for letters, numbers, and common words.</p>
      <div class="dictionary-tabs-search">
        <div class="dictionary-tabs">
          <a href="#/dictionary/alphabet" class="dictionary-tab">Alphabet</a>
          <a href="#/dictionary/numbers" class="dictionary-tab">Numbers</a>
          <a href="#/dictionary/daily-words" class="dictionary-tab active">Daily Words</a>
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
}
