import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";

import "./index.css"

const LoginPage = () => {
    return(
        <div>
            <NavbarBlack />
            <NavbarWhite />
            <div className="login-banner">
                Login
            </div>
            <h1>Login page!</h1>
        </div>
    )
}

export default LoginPage;
