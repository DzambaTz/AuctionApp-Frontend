import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import "./index.scss";

const LandingPage = () => {
  return (
    <div>
      <NavbarBlack />
      <NavbarWhite page="home" />
      <Footer />
      <h1>Landing page!</h1>
    </div>
  );
};

export default LandingPage;
