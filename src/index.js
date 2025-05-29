import "./styles/styles.css";
import "./styles/responsive.css";
import "./index.html";

import {
  renderNavbar,
  setupNavbarEvents,
} from "./scripts/components/navbar.js";
import { renderFooter } from "./scripts/components/footer.js";

document.getElementById("navbar").innerHTML = "";
document.getElementById("footer").innerHTML = "";
document.getElementById("navbar").innerHTML = renderNavbar();
setupNavbarEvents();
document.getElementById("footer").innerHTML = renderFooter();

import HomePresenter from "./scripts/pages/home/home-presenter.js";
import LoginPresenter from "./scripts/pages/auth/login/login-presenter.js";
import Router from "./scripts/routes/routes.js";
const root = document.getElementById("app");
const router = new Router(root);
