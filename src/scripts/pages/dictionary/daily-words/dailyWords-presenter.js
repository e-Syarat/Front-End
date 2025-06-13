import DailyWordsModel from "./dailyWords-model.js";
import DailyWordsPage from "./dailyWords-page.js";

export default class DailyWordsPresenter {
  constructor(root) {
    this.model = new DailyWordsModel();
    this.view = new DailyWordsPage(root);
    this.view.onSearch = this.handleSearch.bind(this);
  }

  init() {
    this.view.showLoading();
    const data = this.model.fetchAll();
    this.view.render(data);
  }

  handleSearch(query) {
    const filtered = this.model.search(query);
    this.view.render(filtered, query);
  }
}
