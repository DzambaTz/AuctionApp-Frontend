import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import authService from "../../Auth/auth.service";
import statusCodes from "../../Helpers/status-codes";

import "./index.scss";
import { useState } from "react/cjs/react.development";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    authService.register(firstName, lastName, email, password).then(
      (response) => {
        if (response?.status == statusCodes.OK) {
          setMessage(response?.body?.message);
          setSuccessful(true);
        } else {
          setMessage(response?.body?.message);
          setSuccessful(false);
        }
      },
      (error) => {
        const resMessage =
          error?.response?.body?.message || error?.message || error.toString();

        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <div className="registration-banner">Registration</div>
      <form className="registration-form" onSubmit={handleRegister}>
        <h1>REGISTER</h1>
        <label htmlFor="registration-first-name">First name</label>
        <br />
        <input
          type="text"
          name="registration-first-name"
          id="registration-first-name"
          placeholder="First name"
          autoComplete="off"
          value={firstName}
          onChange={onChangeFirstName}
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
          value={lastName}
          onChange={onChangeLastName}
          required
        />
        <label htmlFor="registration-email">Email</label>
        <input
          type="email"
          name="registration-email"
          id="registration-email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <label htmlFor="registration-password">Password</label>
        <input
          type="password"
          name="registration-password"
          id="registration-password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <button type="submit">REGISTER</button>
        <br />
        {message && (
          <div
            Style="color: #252525"
            className={
              successful
                ? "registration-message successful"
                : "registration-message failed"
            }
          >
            {message}
          </div>
        )}
        <div>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default RegisterPage;
