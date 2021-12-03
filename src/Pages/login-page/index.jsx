import React, { useState } from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import authService from "../../Auth/auth.service";

import "./index.scss";
import { useHistory } from "react-router";

function LoginPage() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    authService.login(email, password).then(
      () => {
        history.push("/");
        window.location.reload();
      },
      () => {
        setMessage("Invalid email or password");
        setLoading(false);
      }
    );

    setLoading(false);
  };

  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <div className="login-banner">Login</div>
      <form className="login-form" onSubmit={handleLogin}>
        <h1>LOGIN</h1>
        <label htmlFor="login-email">Enter Email</label>
        <br />
        <input
          type="email"
          name="login-email"
          id="login-email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          required
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
          value={password}
          onChange={onChangePassword}
          required
        />
        <br />
        <input type="checkbox" name="login-remember" id="login-remember" />
        <label htmlFor="login-remember" Style="margin-left: 5px">
          Remember me
        </label>{" "}
        <br />
        <button type="submit">LOGIN</button>
        {message && !loading && <div className="login-message">{message}</div>}
      </form>
      <Footer />
    </div>
  );
}

export default LoginPage;
