import PaymentPage from './payment-page.js';

export default class PaymentPresenter {
    constructor(root) {
        this.root = root;
        this.page = new PaymentPage(this.root);
    }

    init() {
        this.page.render();
    }
} 