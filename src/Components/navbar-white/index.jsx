import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../Assets/Images/app_logo.png"


import "./index.css";

const NavbarWhite = () => {
    return(
        <div className="navbar-container">
            <div className="logo">
                <a href="/"><img src={logo} alt="AppLogo" /></a>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search.." />
                <button type="submit"><FontAwesomeIcon icon={faSearch}/></button>
            </div>
            <div className="nav-buttons">
            <a Style="margin-left: auto" className="home" href="/">HOME</a>
            <a className="shop" href="/shop">SHOP</a>
            <a className="account" Style="margin-right: 30%" href="/account">MY ACCOUNT</a>
            </div>
        </div>
    );
}

export default NavbarWhite;