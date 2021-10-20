import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./Pages/landing-page";
import LoginPage from "./Pages/login-page";
import RegistrationPage from "./Pages/registration-page";
import PageNotFound from "./Pages/404-page";
import AboutUsPage from "./Pages/about";

function App() {
  return(
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/signup" component={RegistrationPage}/>
      <Route exact path="/about" component={AboutUsPage} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
  );
}

export default App;
