import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./index.css"

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-pages">
                AUCTION
                <ul>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/terms">Terms and Conditions</a></li>
                    <li><a href="/privacy">Privacy policy</a></li>
                </ul>
            </div>
            <div className="footer-contact">
                GET IN TOUCH
                <ul>
                    <li>Call Us at +123 797-567-2535</li>
                    <li>support@auction.com</li>
                </ul>
                    <ul>
                        <li>
                            <a Style="margin-left: 0" href="https://www.facebook.com/tarik.dzambic" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/d_z_a_m_b_a/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/tarikdzambic/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                        </li>
                    </ul> 
                </div>
            <div className="footer-newsletter" />
        </div>
    );
}

export default Footer;