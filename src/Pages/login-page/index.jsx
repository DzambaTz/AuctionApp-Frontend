import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";

import "./index.scss";

const LoginPage = () => {
  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <div className="login-banner">Login</div>
      <h1>Login page!</h1>
      <Footer />
    </div>
  );
};

export default LoginPage;
