import React, { useEffect, useState } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import authService from "../../Auth/auth.service";

function NavbarBlack() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    authService.logout();
    setCurrentUser(undefined);
  };

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
        {currentUser != undefined ? (
          <div className="navbar-username">
            Hello, {currentUser.firstName + " " + currentUser.lastName}
            <button onClick={handleLogout}>Logout</button>
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

export default NavbarBlack;
