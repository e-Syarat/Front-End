import NumbersModel from "./numbers-model.js";
import NumbersPage from "./numbers-page.js";

export default class NumbersPresenter {
  constructor(root) {
    this.root = root;
    this.model = new NumbersModel();
    this.view = new NumbersPage(root);
  }

  async init() {
    this.root.innerHTML = "<p>Loading...</p>";
    const token = localStorage.getItem("token");
    const data = await this.model.fetchAll(token);
    this.view.render(data);
  }
}
