import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";

import "./index.scss";

const RegistrationPage = () => {
  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <div className="registration-banner">Registration</div>
      <form className="registration-form">
        <h1>REGISTER</h1>
        <label htmlFor="registration-first-name">First name</label>
        <br />
        <input
          type="text"
          name="registration-first-name"
          id="registration-first-name"
          placeholder="First name"
          autoComplete="off"
          required
        />
        <br />
        <label htmlFor="registration-last-name">Last name</label>
        <br />
        <input
          type="text"
          name="registration-last-name"
          id="registration-last-name"
          placeholder="Last name"
          autoComplete="off"
          required
        />
        <label htmlFor="registration-email">Email</label>
        <input
          type="email"
          name="registration-email"
          id="registration-email"
          placeholder="Email"
          autoComplete="off"
          required
        />
        <label htmlFor="registration-password">Password</label>
        <input
          type="password"
          name="registration-password"
          id="registration-password"
          placeholder="Password"
          required
        />
        <button type="submit">REGISTER</button>
        <br />
        <div>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
