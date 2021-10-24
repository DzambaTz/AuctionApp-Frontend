import React from "react";
import "./index.scss";
import logoimg from "../../Assets/Images/app_logo.png";
import Footer from "../../Components/footer";

const PageNotFound = () => {
  return (
    <div>
      <div className="not-found-body">
        <img src={logoimg} alt="" />
        <h1>404</h1>
        <h2>Ooops! Looks like the page is not found...</h2>
        <a href="javascript:window.history.back()">GO BACK</a>
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
