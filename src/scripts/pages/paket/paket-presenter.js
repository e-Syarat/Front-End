import PaketPage from './paket-page.js';

export default class PaketPresenter {
    constructor(root) {
        this.root = root;
        this.page = new PaketPage(this.root);
    }

    init() {
        this.page.render();
    }
} 