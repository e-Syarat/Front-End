import AlphabetModel from "./alphabet-model.js";
import AlphabetPage from "./alphabet-page.js";

export default class AlphabetPresenter {
  constructor(root) {
    this.model = new AlphabetModel();
    this.view = new AlphabetPage(root);
    this.view.onSearch = this.handleSearch.bind(this);
  }

  async init() {
    this.view.showLoading();
    const data = await this.model.fetchAll();
    this.view.render(data);
  }

  handleSearch(query) {
    const filtered = this.model.search(query);
    this.view.render(filtered, query);
  }
}
