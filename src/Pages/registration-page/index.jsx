import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";

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
        </div>
    )
}

export default RegistrationPage;
