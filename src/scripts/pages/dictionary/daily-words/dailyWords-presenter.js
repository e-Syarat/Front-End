import { dailyWordsData } from './dailyWords-model.js';
import { renderDailyWordsPage } from './dailyWords-page.js';

export default class DailyWordsPresenter {
  constructor(root) {
    this.root = root;
    this.currentQuery = '';
  }

  render(filteredData, query = '') {
    this.root.innerHTML = renderDailyWordsPage(filteredData, query);
    const input = this.root.querySelector('.dictionary-search');
    input.value = query;
    input.addEventListener('input', () => {
      if (input.value === '') {
        this.handleSearch('');
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch(input.value);
      }
    });
    input.addEventListener('search', () => {
      this.handleSearch(input.value);
    });
  }

  handleSearch(query) {
    this.currentQuery = query;
    const q = query.trim().toLowerCase();
    if (!q) {
      this.render(dailyWordsData, '');
      return;
    }
    const filtered = dailyWordsData.filter(item => item.word.toLowerCase().includes(q));
    this.render(filtered, query);
  }

  init() {
    this.render(dailyWordsData, '');
  }
}
