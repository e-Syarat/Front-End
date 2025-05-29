import { aboutData } from './about-model.js';
import { renderAboutPage } from './about-page.js';

export default class AboutPresenter {
  constructor(root) {
    this.root = root;
  }

  init() {
    this.root.innerHTML = renderAboutPage(aboutData);
  }
}
