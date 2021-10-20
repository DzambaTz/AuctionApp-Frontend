import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

const NavbarBlack = () => {
    return(
        <div className="body">
            <div className="social-media">
                <ul>
                    <li>
                        <a href="https://www.facebook.com/tarik.dzambic" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/d_z_a_m_b_a/" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                    </li>
                    <li>
                        <a href="https://twitter.com/" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/tarikdzambic/" target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </li>
                </ul>
            </div>
            <div className="login-and-signup">
                <ul>
                    <li Style="margin-left: auto">
                        <a href="/login">Login</a>
                    </li>
                    <li Style="color: #9b9b9b">or</li>
                    <li>
                        <a href="/signup">Create an account</a>
                    </li>
                </ul>
            </div>
           
        </div>
    );
}

export default NavbarBlack;