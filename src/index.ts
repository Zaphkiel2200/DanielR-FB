import Root from "./Root/Root";
import Header from "./components/Header/Header";
import DashboardPage from "./pages/DashboardPage";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

customElements.define('root-element', Root);
customElements.define('header-element', Header);
customElements.define('landing-page', LandingPage);
customElements.define('login-page', LoginPage);
customElements.define('register-page', RegisterPage);
customElements.define('dashboard-page', DashboardPage);
