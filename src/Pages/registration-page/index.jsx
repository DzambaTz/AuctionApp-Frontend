import React, { Component } from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import AuthService from "../../Auth/auth.service";

import "./index.scss";

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirst_name = this.onChangeFirst_name.bind(this);
    this.onChangeLast_name = this.onChangeLast_name.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }
  onChangeFirst_name(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

  onChangeLast_name(e) {
    this.setState({
      last_name: e.target.value,
    });
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

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    AuthService.register(
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    ).then(
      (reponse) => {
        this.setState({
          message: reponse.data.message,
          successful: true,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    return (
      <div>
        <NavbarBlack />
        <NavbarWhite />
        <div className="registration-banner">Registration</div>
        <form className="registration-form" onSubmit={this.handleRegister}>
          <h1>REGISTER</h1>
          <label htmlFor="registration-first-name">First name</label>
          <br />
          <input
            type="text"
            name="registration-first-name"
            id="registration-first-name"
            placeholder="First name"
            autoComplete="off"
            value={this.state.first_name}
            onChange={this.onChangeFirst_name}
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
            value={this.state.last_name}
            onChange={this.onChangeLast_name}
            required
          />
          <label htmlFor="registration-email">Email</label>
          <input
            type="email"
            name="registration-email"
            id="registration-email"
            placeholder="Email"
            autoComplete="off"
            value={this.state.email}
            onChange={this.onChangeEmail}
            required
          />
          <label htmlFor="registration-password">Password</label>
          <input
            type="password"
            name="registration-password"
            id="registration-password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChangePassword}
            required
          />
          <button type="submit">REGISTER</button>
          <br />
          {this.state.message && (
            <div
              Style="color: #252525"
              className={
                this.state.successful
                  ? "registration-message successful"
                  : "registration-message failed"
              }
            >
              {this.state.message}
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
}
