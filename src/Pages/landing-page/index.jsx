import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import "./index.css"

const LandingPage = () => {
    return(
        <div>
            <NavbarBlack />
            <NavbarWhite />
            <Footer />
            <h1>Landing page!</h1>
        </div>
        
    )
}

export default LandingPage;
