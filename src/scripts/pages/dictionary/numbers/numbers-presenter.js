import { numbersData } from './numbers-model.js';
import { renderNumbersPage } from './numbers-page.js';

export default class NumbersPresenter {
  constructor(root) {
    this.root = root;
    this.currentQuery = '';
  }

  render(filteredData, query = '') {
    this.root.innerHTML = renderNumbersPage(filteredData, query);
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
    const q = query.trim();
    if (!q) {
      this.render(numbersData, '');
      return;
    }
    const filtered = numbersData.filter(item => item.number.includes(q));
    this.render(filtered, query);
  }

  init() {
    this.render(numbersData, '');
  }
}
