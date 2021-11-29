import React from "react";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Footer from "../../Components/footer";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import featuredShoe from "../../Assets/Images/featured-shoe.jpg";
import ItemCard from "../../Components/item-card";
import testData from "../../Helpers/test-data";

import { useState } from "react";
import GridView from "../../Components/grid-view";
import { useEffect } from "react/cjs/react.development";
import itemService from "../../Services/item.service";

const LandingPage = () => {
  const [gridTab, setGridTab] = useState("new");
  const [newArrivals, setNewArrivals] = useState("");
  const [lastChance, setLastChance] = useState("");

  useEffect(() => {
    itemService.getNewArrivals().then((response) => {
      setNewArrivals(response.body);
    });
    itemService.getLastChance().then((response) => {
      setLastChance(response.body);
    });
  }, []);

  const setTabNew = () => {
    setGridTab("new");
  };

  const setTabLast = () => {
    setGridTab("last");
  };

  return (
    <div className="landing-page">
      <NavbarBlack />
      <NavbarWhite page="home" />
      <div className="landing-main">
        <div className="categories">
          <h2>CATEGORIES</h2>
          <ul>
            {testData.categories.map((category) => {
              return (
                <li>
                  <a href={category.path}>{category.name}</a>
                </li>
              );
            })}
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
        <GridView columns={4} columnGap="1%" marginLeft="8%">
          {newArrivals &&
            newArrivals.map((item) => {
              return (
                <ItemCard
                  image={item.images[0] + ".jpeg"}
                  title={item.name}
                  price={item.startPrice}
                  link={"/item/preview/" + item.id}
                />
              );
            })}
        </GridView>
      ) : (
        <GridView columns={4} columnGap="1%" marginLeft="8%">
          {lastChance &&
            lastChance.map((item) => {
              return (
                <ItemCard
                  image={item.images[0] + ".jpeg"}
                  title={item.name}
                  price={item.startPrice}
                  link={"/item/preview/" + item.id}
                />
              );
            })}
        </GridView>
      )}
      <Footer />
    </div>
  );
};

export default LandingPage;
