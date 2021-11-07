import React, { Component } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import AuthService from "../../Auth/auth.service";

export default class NavbarBlack extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  handleLogout(e) {
    e.preventDefault();

    AuthService.logout(this.state.currentUser.id);
    window.location.reload();
  }

  render() {
    return (
      <div className="navbar-body">
        <div className="social-media">
          <ul>
            <li>
              <a
                href="https://www.facebook.com/tarik.dzambic"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/d_z_a_m_b_a/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/tarikdzambic/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </div>
        <div className="login-and-signup">
          {this.state.currentUser != undefined ? (
            <div className="navbar-username">
              Hello,{" "}
              {this.state.currentUser.first_name +
                " " +
                this.state.currentUser.last_name}
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          ) : (
            <ul>
              <li Style="margin-left: auto">
                <a href="/login">Login</a>
              </li>
              <li Style="color: #9b9b9b; text-decoration: none">or</li>
              <li>
                <a href="/signup">Create an account</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}
