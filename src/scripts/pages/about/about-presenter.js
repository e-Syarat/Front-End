import { aboutData } from "./about-model.js";
import AboutPage from "./about-page.js";

export default class AboutPresenter {
  constructor(root) {
    this.root = root;
    this.view = new AboutPage(root);
  }

  init() {
    this.view.render(aboutData);
  }
}
