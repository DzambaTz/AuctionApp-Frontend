import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./Pages/landing-page";
import LoginPage from "./Pages/login-page";
import RegistrationPage from "./Pages/registration-page";
import PageNotFound from "./Pages/404-page";
import AboutUsPage from "./Pages/about";
import PrivacyPage from "./Pages/privacy-policy";
import TermsPage from "./Pages/terms-and-conditions";
import ItemPreviewPage from "./Pages/item-preview-page";
import ShopPage from "./Pages/shop-page";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={RegistrationPage} />
        <Route exact path="/about" component={AboutUsPage} />
        <Route exact path="/privacy" component={PrivacyPage} />
        <Route exact path="/terms" component={TermsPage} />
        <Route path="/item/preview/:id" component={ItemPreviewPage} />
        <Route path="/shop/:category" component={ShopPage} />
        <Route path="/shop/" component={ShopPage} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
