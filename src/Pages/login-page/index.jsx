import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";

import loginService from "../../Auth/loginService";

import "./index.scss";

const LoginPage = () => {
  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <div className="login-banner">Login</div>
      <form className="login-form" onClick={loginService("message")}>
        <h1>LOGIN</h1>
        <label htmlFor="login-email">Enter Email</label>
        <br />
        <input
          type="email"
          name="login-email"
          id="login-email"
          placeholder="Email"
        />
        <br />
        <label htmlFor="login-password">Password</label>
        <br />
        <input
          type="password"
          name="login-password"
          id="login-password"
          placeholder="Password"
          Style="margin-bottom: 5px;"
        />
        <br />
        <input type="checkbox" name="login-remember" id="login-remember" />
        <label htmlFor="login-remember" Style="margin-left: 5px">
          Remember me
        </label>{" "}
        <br />
        <button type="submit">LOGIN</button>
      </form>
      <Footer />
    </div>
  );
};

export default LoginPage;
