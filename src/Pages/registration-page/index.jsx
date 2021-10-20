import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";

import "./index.css";

const RegistrationPage = () => {
    return(
        <div>
            <NavbarBlack />
            <NavbarWhite />
            <div className="registration-banner">
                Registration
            </div>
            <h1>Registration page!</h1>
            <Footer />
        </div>
    )
}

export default RegistrationPage;
