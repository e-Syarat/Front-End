import NumbersModel from "./numbers-model.js";
import NumbersPage from "./numbers-page.js";

export default class NumbersPresenter {
  constructor(root) {
    this.model = new NumbersModel();
    this.view = new NumbersPage(root);
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
