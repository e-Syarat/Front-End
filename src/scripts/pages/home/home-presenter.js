// Presenter untuk Homepage (MVP Pattern)
import HomeModel from './home-model.js';
import HomePage from './home-page.js';

export default class HomePresenter {
  constructor(root) {
    this.model = new HomeModel();
    this.view = new HomePage(root);
  }

  init() {
    const hero = this.model.getHeroSection();
    const features = this.model.getFeatures();
    const stats = this.model.getStats();
    const testimonials = this.model.getTestimonials();
    this.view.render({ hero, features, stats, testimonials });
  }
}
