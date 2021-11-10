import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Footer from "../../Components/footer";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Banner from "../../Components/banner";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import testData from "../../Helpers/test-data";
import userService from "../../Auth/user.service";
import durationToTime from "../../Helpers/durationToTime";
import authService from "../../Auth/auth.service";

function ItemPreviewPage() {
  const itemId = useParams().id;
  userService.getItemData(itemId);
  const [item, setItem] = useState(JSON.parse(localStorage.getItem("item")));
  const [mainImage, setMainImage] = useState(testData.itemPreviewImages[0]);
  const [timeLeft, setTimeLeft] = useState(durationToTime(item.endTime));
  const [bidAmount, setBidAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const setBidAmountValue = (e) => {
    setBidAmount(e.target.value);
  };

  const placeBid = (e) => {
    e.preventDefault();
    if (bidAmount == "") {
      setMessage("Enter a valid bid amount!");
      return;
    }
    if (
      authService.getCurrentUser() == null ||
      !authService.getCurrentUser().roles.includes("ROLE_SELLER")
    ) {
      setMessage("You must be logged in to bid!");
      return;
    }

    userService.placeBid(itemId, bidAmount).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        setBidAmount("");
        userService.getItemData(itemId).then(() => {
          setItem(JSON.parse(localStorage.getItem("item")));
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setBidAmount("");
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="item-preview-page">
      <NavbarBlack />
      <NavbarWhite page="shop" />
      <Banner title={item.itemName} base="Shop" current="Single product" />
      {message && (
        <div
          className={
            successful ? "bid-placed bid-message" : "bid-not-placed bid-message"
          }
        >
          {message}
        </div>
      )}
      <div className="item-main">
        <div className="item-images">
          <img src={mainImage} alt="" />
          <div className="image-grid">
            {testData.itemPreviewImages.map((image) => (
              <img src={image} alt="" onClick={() => setMainImage(image)} />
            ))}
          </div>
        </div>
        <div className="item-info">
          <h1>{item.itemName}</h1>
          <h4>
            Starts from <span>${item.startingPrice}</span>
          </h4>
          <div className="auction-info">
            <h3>
              Highest bid: <span>${item.highestBid}</span>
            </h3>
            <h3>
              Number of bids: <span>{item.numberOfBids}</span>
            </h3>
            <h3>
              Time left: <span>{timeLeft}</span>
            </h3>
          </div>
          {authService.getCurrentUser() && (
            <form className="bidding-form">
              <input
                type="text"
                name="bid-amount"
                id="bid-amount"
                value={bidAmount}
                onChange={setBidAmountValue}
                autoComplete="off"
                placeholder={
                  "Enter $" +
                  (item.highestBid == 0
                    ? (item.startingPrice + 0.01).toFixed(2)
                    : (item.highestBid + 0.01).toFixed(2) + " or higher")
                }
              />
              <button type="submit" onClick={placeBid}>
                PLACE BID{" "}
                <FontAwesomeIcon className="angle-right" icon={faAngleRight} />
              </button>
            </form>
          )}
          <div className="item-description">
            <button>Details</button>
            <hr />
            {item.itemDescription}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ItemPreviewPage;
