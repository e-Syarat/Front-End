import { alphabetData } from './alphabet-model.js';
import { renderAlphabetPage } from './alphabet-page.js';

export default class AlphabetPresenter {
  constructor(root) {
    this.root = root;
    this.currentQuery = '';
  }

  render(filteredData, query = '') {
    this.root.innerHTML = renderAlphabetPage(filteredData, query);
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
      this.render(alphabetData, '');
      return;
    }
    const filtered = alphabetData.filter(item => item.letter.toLowerCase().includes(q));
    this.render(filtered, query);
  }

  init() {
    this.render(alphabetData, '');
  }
}
