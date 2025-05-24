import PracticePage from './practice-page.js';

export default class PracticePresenter {
    constructor(root) {
        this.view = new PracticePage(root);
    }

    init() {
        this.view.render();
    }
} 