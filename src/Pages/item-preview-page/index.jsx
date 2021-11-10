import React from "react";
import { useParams } from "react-router";
import Footer from "../../Components/footer";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Banner from "../../Components/banner";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function ItemPreviewPage() {
  const itemId = useParams().id;

  return (
    <div className="item-preview-page">
      <NavbarBlack />
      <NavbarWhite page="shop" />
      <Banner
        title="BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats"
        base="Shop"
        current="Single product"
      />
      <div className="item-main">
        <div className="item-images"></div>
        <div className="item-info">
          <h1>BIYLACLESEN Womens 3-in-1 Snowboard Jacket Winter Coats</h1>
          <h4>
            Starts from <span>$56.99</span>
          </h4>
          <div className="auction-info">
            <h3>
              Highest bid: <span>57$</span>
            </h3>
            <h3>
              Number of bids: <span>1</span>
            </h3>
            <h3>
              Time left: <span>10 Weeks 6 days</span>
            </h3>
          </div>
          <form className="bidding-form">
            <input
              type="text"
              name="bid-amount"
              id="bid-amount"
              placeholder="Enter $57.00 or higher"
            />
            <button type="submit">
              PLACE BID{" "}
              <FontAwesomeIcon className="angle-right" icon={faAngleRight} />
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ItemPreviewPage;
