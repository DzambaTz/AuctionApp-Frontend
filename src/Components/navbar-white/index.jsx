import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../Assets/Images/app_logo.png";

import "./index.scss";

const NavbarWhite = (props) => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="AppLogo" />
        </a>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search.." />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="nav-buttons">
        {props.page == "home" ? (
          <a
            Style="margin-left: auto; color: #8367d8; font-weight: 700;"
            href="/"
          >
            HOME
          </a>
        ) : (
          <a Style="margin-left: auto" href="/">
            HOME
          </a>
        )}
        {props.page == "shop" ? (
          <a Style="color: #8367d8;font-weight: 700;" href="/shop">
            SHOP
          </a>
        ) : (
          <a href="/shop">SHOP</a>
        )}
        {props.page == "account" ? (
          <a
            Style="color: #8367d8;font-weight: 700;margin-right: 30%;"
            href="/shop"
          >
            MY ACCOUNT
          </a>
        ) : (
          <a Style="margin-right: 30%;" href="/shop">
            ACCOUNT
          </a>
        )}
      </div>
    </div>
  );
};

export default NavbarWhite;
