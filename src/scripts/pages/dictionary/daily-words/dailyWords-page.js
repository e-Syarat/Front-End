export function renderDailyWordsPage(data, query = "") {
  const originalData = renderDailyWordsPage.originalData || data;
  if (!renderDailyWordsPage.originalData) renderDailyWordsPage.originalData = data;

  const filtered = query
    ? originalData.filter((item) =>
        item.word.toLowerCase().includes(query.trim().toLowerCase())
      )
    : data;

  return `
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
        ${filtered
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
