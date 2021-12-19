import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../Assets/Images/app_logo.png";
import authService from "../../Auth/auth.service";
import { ACCOUNT_TABS } from "../../Helpers/accountPageUtils";

import "./index.scss";

const NavbarWhite = (props) => {
  const searchItemsInput = (e) => {
    if (e.key === "Enter")
      window.location.href =
        "/search/" + document.getElementById("search-bar").value;
  };

  const searchItemsButton = () => {
    window.location.href =
      "/search/" + document.getElementById("search-bar").value;
  };

  return (
    <div className="navbar-container">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="AppLogo" />
        </a>
      </div>
      <div className="search-bar">
        <input
          type="text"
          id="search-bar"
          placeholder="Search.."
          onKeyDown={searchItemsInput}
        />
        <button type="submit" onClick={searchItemsButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="nav-buttons">
        {props.page === "home" ? (
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
        {props.page === "shop" ? (
          <a Style="color: #8367d8;font-weight: 700;" href="/shop">
            SHOP
          </a>
        ) : (
          <a href="/shop">SHOP</a>
        )}
        {props.page === "account"
          ? authService.getCurrentUser() && (
              <div>
                <a
                  id="account-tab"
                  Style="color: #8367d8;font-weight: 700;"
                  href="/account"
                >
                  MY ACCOUNT
                </a>
                <div className="account-links">
                  {ACCOUNT_TABS.map((tab) => {
                    return <a href={tab.link}>{tab.text}</a>;
                  })}
                </div>
              </div>
            )
          : authService.getCurrentUser() && (
              <div className="account-links-container">
                <a id="account-tab" href="/account">
                  MY ACCOUNT
                </a>
                <div className="account-links">
                  {ACCOUNT_TABS.map((tab) => {
                    return <a href={tab.link}>{tab.text}</a>;
                  })}
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default NavbarWhite;
