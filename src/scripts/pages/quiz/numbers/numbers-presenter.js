import NumbersPage from './numbers-page.js';
import NumbersModel from './numbers-model.js';

export default class NumbersPresenter {
    constructor(root) {
        this.root = root;
        this.page = new NumbersPage(this.root);
    }

    init() {
        this.page.render();
    }
} 