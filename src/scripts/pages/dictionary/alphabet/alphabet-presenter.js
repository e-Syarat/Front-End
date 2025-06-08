import AlphabetModel from "./alphabet-model.js";
import AlphabetPage from "./alphabet-page.js";

export default class AlphabetPresenter {
  constructor(root) {
    this.root = root;
    this.model = new AlphabetModel();
    this.view = new AlphabetPage(root);
  }

  async init() {
    this.root.innerHTML = "<p>Loading...</p>";
    const token = localStorage.getItem("token");
    const data = await this.model.fetchAll(token);
    this.view.render(data);
  }
}
