import React, { Component } from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import AuthService from "../../Auth/auth.service";

import "./index.scss";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(this.state.email, this.state.password).then(
      () => {
        this.props.history.push("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );

    this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <div>
        <NavbarBlack />
        <NavbarWhite />
        <div className="login-banner">Login</div>
        <form className="login-form" onSubmit={this.handleLogin}>
          <h1>LOGIN</h1>
          <label htmlFor="login-email">Enter Email</label>
          <br />
          <input
            type="email"
            name="login-email"
            id="login-email"
            autoComplete="off"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onChangeEmail}
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
            value={this.state.password}
            onChange={(this, this.onChangePassword)}
            required
          />
          <br />
          <input type="checkbox" name="login-remember" id="login-remember" />
          <label htmlFor="login-remember" Style="margin-left: 5px">
            Remember me
          </label>{" "}
          <br />
          <button type="submit">LOGIN</button>
          {this.state.message && (
            <div className="login-message">{this.state.message}</div>
          )}
        </form>
        <Footer />
      </div>
    );
  }
}
