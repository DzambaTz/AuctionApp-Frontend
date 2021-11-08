import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import featuredShoe from "../../Assets/Images/featured-shoe.jpg";
import cardImage1 from "../../Assets/Images/card-image-1.png";
import cardImage2 from "../../Assets/Images/card-image-2.png";
import ItemCard from "../../Components/item-card";

import { useState } from "react";
import GridView from "../../Components/grid-view";

const LandingPage = () => {
  const [gridTab, setGridTab] = useState("new");

  const setTabNew = () => {
    setGridTab("new");
  };

  const setTabLast = () => {
    setGridTab("last");
  };

  return (
    <div>
      <NavbarBlack />
      <NavbarWhite page="home" />
      <div className="landing-main">
        <div className="categories">
          <h2>CATEGORIES</h2>
          <ul>
            <li>
              <a href="/shop/fashion">Fashion</a>
            </li>
            <li>
              <a href="/shop/accessories">Accessories</a>
            </li>
            <li>
              <a href="/shop/jewlery">Jewlery</a>
            </li>
            <li>
              <a href="/shop/shoes">Shoes</a>
            </li>
            <li>
              <a href="/shop/sports">Sportswear</a>
            </li>
            <li>
              <a href="/shop/home">Home</a>
            </li>
            <li>
              <a href="/shop/electronics">Electronics</a>
            </li>
            <li>
              <a href="/shop/mobile">Mobile</a>
            </li>
            <li>
              <a href="/shop/computer">Computer</a>
            </li>
            <li>
              <a href="/shop">All Categories</a>
            </li>
          </ul>
        </div>
        <div className="featured-item">
          <img className="featured-item-image" src={featuredShoe} alt="shoe" />
          <h1>Running Shoes</h1>
          <br />
          <h2>Start From $59.00</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra
            placerat. Aenean auctor luctus tempus. Cras laoreet et magna in
            dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In
            hac habitasse platea dictumst.
          </p>
          <a href="/">
            BID NOW{" "}
            <FontAwesomeIcon className="angle-right" icon={faAngleRight} />
          </a>
        </div>
        <div Style="clear: both"></div>
      </div>
      <ul className="landing-grid-tabs">
        <li>
          <button
            onClick={setTabNew}
            className={
              gridTab === "new" ? "no-border selected-tab" : "no-border"
            }
          >
            New Arrivals
          </button>
        </li>
        <li>
          <button
            onClick={setTabLast}
            className={
              gridTab === "last" ? "no-border selected-tab" : "no-border"
            }
          >
            Last Chance
          </button>
        </li>
        <hr />
      </ul>
      {gridTab === "new" ? (
        <GridView>
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage1} title="Shoe Collection" price="59.00" />
        </GridView>
      ) : (
        <GridView>
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
          <ItemCard image={cardImage2} title="Shoe Collection" price="59.00" />
        </GridView>
      )}
      <Footer />
    </div>
  );
};

export default LandingPage;
