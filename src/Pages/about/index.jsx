import React from "react";
import "./index.scss";

import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import Banner from "../../Components/banner";

import aboutImg1 from "../../Assets/Images/about-1.png";
import aboutImg2 from "../../Assets/Images/about-2.png";
import aboutImg3 from "../../Assets/Images/about-3.jpg";

const AboutUsPage = () => {
  return (
    <div>
      <NavbarBlack />
      <NavbarWhite page="shop" />
      <Banner title="About us" base="Shop" current="About us" />
      <div className="about-body">
        <div className="about-text">
          <h1>About us</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
          mauris, venenatis sit amet porttitor id, laoreet eu magna. In
          convallis diam volutpat libero tincidunt semper. Ut aliquet erat
          rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet
          diam malesuada, eget laoreet quam molestie. In id elementum turpis.
          Curabitur quis tincidunt mauris. <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
          mauris, venenatis sit amet porttitor id, laoreet eu magna. In
          convallis diam volutpat libero tincidunt semper. Ut aliquet erat
          rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet
          diam malesuada, eget laoreet quam molestie. In id elementum turpis.
          Curabitur quis tincidunt mauris. <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
          mauris, venenatis sit amet porttitor id, laoreet eu magna. In
          convallis diam volutpat libero tincidunt semper. Ut aliquet erat
          rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet
          diam malesuada, eget laoreet quam molestie. In id elementum turpis.
          Curabitur quis tincidunt mauris. <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
          mauris, venenatis sit amet porttitor id, laoreet eu magna. In
          convallis diam volutpat libero tincidunt semper. Ut aliquet erat
          rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet
          diam malesuada, eget laoreet quam molestie. In id elementum turpis.
          Curabitur quis tincidunt mauris. <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
          mauris, venenatis sit amet porttitor id, laoreet eu magna. In
          convallis diam volutpat libero tincidunt semper. Ut aliquet erat
          rutrum, venenatis lacus ut, ornare lectus.
        </div>
        <div className="about-images">
          <img Style="max-width: 66%" src={aboutImg1} alt="" /> <br />
          <img src={aboutImg2} alt="" />
          <img src={aboutImg3} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
