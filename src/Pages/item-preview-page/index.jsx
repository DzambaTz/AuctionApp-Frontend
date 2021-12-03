import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Footer from "../../Components/footer";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Banner from "../../Components/banner";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import durationToTime from "../../Helpers/durationToTime";
import authService from "../../Auth/auth.service";
import itemService from "../../Services/item.service";
import userService from "../../Services/user.service";
import statusCodes from "../../Helpers/status-codes";

function ItemPreviewPage() {
  const itemId = useParams().id;
  const [item, setItem] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    itemService.getItemData(itemId).then((response) => {
      setItem(response.body);
      setTimeLeft(durationToTime(response.body.endTime));
      setMainImage(response.body.itemImages[0].toString() + ".jpeg");
    });
  }, []);

  const setBidAmountValue = (e) => {
    setBidAmount(e.target.value);
  };

  const placeBid = (e) => {
    e.preventDefault();
    if (bidAmount == "") {
      setSuccessful(false);
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
        if (response?.status == statusCodes.OK) {
          setMessage(response.body.message);
          setSuccessful(true);
          setBidAmount("");
          userService.getItemData(itemId).then((response) => {
            setItem(response.body);
          });
        } else {
          setBidAmount("");
          setSuccessful(false);
          setMessage(response.body.message);
        }
      },
      (error) => {
        const resMessage =
          error?.response?.body?.message || error?.message || error.toString();

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
          <img className="main-image" src={mainImage} alt="" />
          <div className="image-grid">
            {item &&
              item.itemImages.map((image) => (
                <img
                  src={image + ".jpeg"}
                  alt=""
                  onClick={() => setMainImage(image + ".jpeg")}
                />
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
                type="number"
                name="bid-amount"
                id="bid-amount"
                value={bidAmount}
                onChange={setBidAmountValue}
                autoComplete="off"
                placeholder={
                  "Enter $" +
                  (item.highestBid == 0
                    ? item.startingPrice.toFixed(2) + " or higher"
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
