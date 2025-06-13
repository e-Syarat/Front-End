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
        <section class="quiz-section">
          <div style="text-align: center; padding: 40px 20px;">
            <h2 style="font-size: 24px; color: #1e3a8a; margin-bottom: 16px;">Segera Hadir!</h2>
            <p style="color: #666; margin-bottom: 24px;">Fitur latihan angka sedang dalam pengembangan.</p>
          </div>
        </section>
      `;
  }
}
  