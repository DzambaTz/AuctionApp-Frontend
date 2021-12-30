import NavbarWhite from "../../Components/navbar-white";
import NavbarBlack from "../../Components/navbar-black";
import Footer from "../../Components/footer";
import Banner from "../../Components/banner";

import "./index.scss";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import {
  ACTIVE_ITEMS_TAB,
  BIDS_TAB,
  PROFILE_TAB,
  SELLER_TAB,
  SETTINGS_TAB,
  SOLD_ITEMS_TAB,
} from "../../Helpers/accountPageUtils";
import titleCase from "../../Helpers/titleCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faList,
  faDollarSign,
  faCog,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import userService from "../../Services/user.service";
import statusCodes from "../../Helpers/status-codes";
import { useEffect } from "react";
import uploadImage from "../../Helpers/uploadImage";
import itemService from "../../Services/item.service";
import cartImage from "../../Assets/Images/cart.png";

function AccountPage() {
  const pathTab = useParams().tab;
  const [activeTab, setActiveTab] = useState(pathTab ? pathTab : PROFILE_TAB);
  const [successful, setSuccessful] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
  );
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dayOfBirth, sethayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [activeSellerTableTab, setActiveSellerTableTab] =
    useState(ACTIVE_ITEMS_TAB);
  const [activeItems, setActiveItems] = useState("");
  const [soldItems, setSoldItems] = useState("");
  const [bidItems, setBidItems] = useState("");

  useEffect(() => {
    if (activeTab == PROFILE_TAB) {
      userService.getProfilePhoto().then((response) => {
        if (response.status == statusCodes.OK)
          response.body.message != "No value present" &&
            setProfilePhoto(response.body.message);
      });
      userService.getPersonalInfo().then((response) => {
        if (response.status == statusCodes.OK) {
          setFirstName(response.body.firstName);
          setLastName(response.body.lastName);
          setPhoneNumber(response.body.phoneNumber);
          setEmail(response.body.email);
          setStreetAddress(response.body.streetAddress);
          setCity(response.body.city);
          setZipCode(response.body.zipCode);
          setState(response.body.state);
          setCountry(response.body.country);
          setNameOnCard(response.body.nameOnCard);
          setCardNumber(response.body.cardNumber);
          setExpirationMonth(response.body.expirationDate?.split("/")[0]);
          setExpirationYear(response.body.expirationDate?.split("/")[1]);
          setCvv(response.body.cvv);
          sethayOfBirth(response.body.dateOfBirth?.split("/")[0]);
          setMonthOfBirth(response.body.dateOfBirth?.split("/")[1]);
          setYearOfBirth(response.body.dateOfBirth?.split("/")[2]);
          setGender(response.body.gender);
        }
      });
    } else if (activeTab == SELLER_TAB) {
      itemService.getActiveItems().then((response) => {
        if (response.status == statusCodes.OK) setActiveItems(response.body);
      });
      itemService.getSoldItems().then((response) => {
        if (response.status == statusCodes.OK) setSoldItems(response.body);
      });
    } else if (activeTab == BIDS_TAB) {
      itemService.getUserBidsItems().then((response) => {
        if (response.status == statusCodes.OK) {
          setBidItems(response.body);
        }
      });
    }
  }, [activeTab]);

  useEffect(() => {
    setMessage("");
  }, [activeTab]);

  const changeImage = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      uploadImage(reader.result.substring(reader.result.search(","))).then(
        (response) => {
          if (response.body.status == statusCodes.OK) {
            userService
              .changeProfilePhoto(response.body.data.link)
              .then((response) => {
                if (response.status == statusCodes.OK) {
                  setSuccessful(true);
                  setMessage("Profile picture successfully changed!");
                } else {
                  setSuccessful(false);
                  setMessage(
                    "Error while trying to change the profile picture"
                  );
                }
              });
          }
          setProfilePhoto(response.body.data.link);
        }
      );
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const saveProfileInfo = () => {
    userService
      .changePersonalInfo(
        firstName,
        lastName,
        phoneNumber,
        gender,
        [dayOfBirth, monthOfBirth, yearOfBirth].join("/"),
        streetAddress,
        city,
        zipCode,
        state,
        country,
        nameOnCard,
        cardNumber,
        [expirationMonth, expirationYear].join("/"),
        cvv
      )
      .then((response) => {
        if (response.status == statusCodes.OK) {
          setSuccessful(true);
          setMessage(response.body.message);
        } else {
          setSuccessful(false);
          setMessage("Error while trying to update personal info!");
        }
      });
  };

  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <Banner
        title={titleCase(activeTab)}
        base="My Account"
        current={titleCase(activeTab)}
      />
      {message && (
        <div
          className={
            successful ? "bid-placed bid-message" : "bid-not-placed bid-message"
          }
        >
          {message}
        </div>
      )}
      <div className="account-nav-tabs">
        <button
          className={
            activeTab == PROFILE_TAB
              ? "active-account-tab"
              : "not-active-account-tab"
          }
          onClick={() => setActiveTab(PROFILE_TAB)}
        >
          <FontAwesomeIcon icon={faUser} />
          Profile
        </button>
        <button
          className={
            activeTab == SELLER_TAB
              ? "active-account-tab"
              : "not-active-account-tab"
          }
          onClick={() => setActiveTab(SELLER_TAB)}
        >
          <FontAwesomeIcon icon={faList} /> Seller
        </button>
        <button
          className={
            activeTab == BIDS_TAB
              ? "active-account-tab"
              : "not-active-account-tab"
          }
          onClick={() => setActiveTab(BIDS_TAB)}
        >
          <FontAwesomeIcon icon={faDollarSign} /> Bids
        </button>
        <button
          className={
            activeTab == SETTINGS_TAB
              ? "active-account-tab"
              : "not-active-account-tab"
          }
          onClick={() => setActiveTab(SETTINGS_TAB)}
        >
          <FontAwesomeIcon icon={faCog} /> Settings
        </button>
      </div>
      {activeTab == PROFILE_TAB && (
        <div>
          <div className="profile-personal-info-form">
            <h2>Personal info</h2>
            <div className="profile-photo">
              <img src={profilePhoto} alt="" />
              <label class="custom-file-upload">
                <input type="file" onChange={changeImage} />
                Change photo
              </label>
            </div>
            <div className="profile-personal-info">
              <h1>First name</h1>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <h1>Last Name</h1>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <h1>I am</h1>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <h1>Date of birth</h1>
              <div className="date-of-birth-input">
                <input
                  type="text"
                  placeholder="DD"
                  onChange={(e) => sethayOfBirth(e.target.value)}
                  value={dayOfBirth}
                />
                <input
                  type="text"
                  placeholder="MM"
                  onChange={(e) => setMonthOfBirth(e.target.value)}
                  value={monthOfBirth}
                />
                <input
                  type="text"
                  placeholder="YYYY"
                  onChange={(e) => setYearOfBirth(e.target.value)}
                  value={yearOfBirth}
                />
              </div>
              <h1>Phone number</h1>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <h1>Email address</h1>
              <input type="text" disabled="true" value={email} />
            </div>
          </div>
          <div className="profile-card-info-form">
            <h2>Card information</h2>
            <input type="radio" name="payment" /> Pay Pal <br />
            <input type="radio" name="payment" checked /> Credit Card <br />
            <h1>Name on card</h1>
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
            />
            <h1>Card number</h1>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="expiration-date-input">
              <h1>Expiration date</h1>
              <h1 Style="margin-left: 35%">CVC/CVV</h1>
              <span>
                <input
                  type="text"
                  placeholder="MM"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="YY"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                />
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="profile-address-info-form">
            <h2>Optional</h2>
            <h1>Street</h1>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <span>
              <h1>City</h1>
              <h1 Style="margin-left: 33%">Zip Code</h1>
              <br />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                Style="margin-left: 10%"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </span>
            <h1>Country</h1>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button className="profile-info-submit" onClick={saveProfileInfo}>
            SAVE INFO
            <span>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </button>
        </div>
      )}
      {activeTab == SELLER_TAB && (
        <div className="seller-tab">
          <div className="seller-tab-table-switch">
            <button
              className={
                activeSellerTableTab == ACTIVE_ITEMS_TAB
                  ? "active-tab"
                  : "not-active-tab"
              }
              onClick={() => setActiveSellerTableTab(ACTIVE_ITEMS_TAB)}
            >
              Active
            </button>
            <button
              className={
                activeSellerTableTab == SOLD_ITEMS_TAB
                  ? "active-tab"
                  : "not-active-tab"
              }
              onClick={() => setActiveSellerTableTab(SOLD_ITEMS_TAB)}
            >
              Sold
            </button>
          </div>
          <table>
            <tr>
              <th Style="width:10%">Item</th>
              <th Style="width:30%">Name</th>
              {activeSellerTableTab == ACTIVE_ITEMS_TAB && (
                <th Style="width:10%">Time left</th>
              )}
              <th Style="width:10%">Your price</th>
              <th Style="width:10%">No. bids</th>
              <th Style="width:10%">Highest bid</th>
              <th Style="width:10%"></th>
            </tr>
            {activeItems
              ? activeSellerTableTab == ACTIVE_ITEMS_TAB &&
                activeItems.map((item) => {
                  return (
                    <tr>
                      <td Style="text-align: center; padding-left: 0">
                        <img src={item.imageUrl} alt="" />
                      </td>
                      <td>
                        {item.name} <br /> <span>#{item.itemId}</span>
                      </td>
                      <td>{item.timeLeft.substr(0, 7)}</td>
                      <td>$ {item.startPrice}</td>
                      <td Style="padding-left:55px">{item.numberOfBids}</td>
                      <td>$ {item.highestBid}</td>
                      <td>
                        <a href={`/item/preview/${item.itemId}`}>VIEW</a>
                      </td>
                    </tr>
                  );
                })
              : activeSellerTableTab == ACTIVE_ITEMS_TAB && (
                  <tr className="no-items-view">
                    <td colSpan={6}>
                      <img Style="max-height: 75px;" src={cartImage} alt="" />
                      <h1>You do not have any items for sale.</h1>
                      <a id="start-selling" href="/">
                        START SELLING
                      </a>
                    </td>
                  </tr>
                )}
            {soldItems
              ? activeSellerTableTab == SOLD_ITEMS_TAB &&
                soldItems.map((item) => {
                  return (
                    <tr>
                      <td Style="text-align: center; padding-left: 0">
                        <img src={item.imageUrl} alt="" />
                      </td>
                      <td>
                        {item.name} <br /> <span>#{item.itemId}</span>
                      </td>
                      <td>$ {item.startPrice}</td>
                      <td Style="padding-left:55px">{item.numberOfBids}</td>
                      <td>$ {item.highestBid}</td>
                      <td>
                        <a href={`/item/preview/${item.itemId}`}>VIEW</a>
                      </td>
                    </tr>
                  );
                })
              : activeSellerTableTab == SOLD_ITEMS_TAB && (
                  <tr className="no-items-view">
                    <td colSpan={6}>
                      <img Style="max-height: 75px;" src={cartImage} alt="" />
                      <h1>You do not have any sold items.</h1>
                      <a id="start-selling" href="/">
                        START SELLING
                      </a>
                    </td>
                  </tr>
                )}
          </table>
        </div>
      )}
      {activeTab == BIDS_TAB && (
        <div className="seller-tab">
          <table>
            <tr>
              <th Style="width:10%">Item</th>
              <th Style="width:30%">Name</th>
              {<th Style="width:10%">Time left</th>}
              <th Style="width:10%">Your bid</th>
              <th Style="width:10%">No. bids</th>
              <th Style="width:10%">Highest bid</th>
              <th Style="width:10%"></th>
            </tr>
            {bidItems ? (
              bidItems.map((item) => {
                return (
                  <tr>
                    <td Style="text-align: center; padding-left: 0">
                      <img src={item.imageUrl} alt="" />
                    </td>
                    <td>
                      {item.name} <br /> <span>#{item.itemId}</span>
                    </td>
                    <td>{item.timeLeft.substr(0, 7)}</td>
                    <td>$ {item.bidAmount}</td>
                    <td Style="padding-left:55px">{item.count}</td>
                    <td
                      Style={
                        item.maxBidAmount > item.bidAmount
                          ? "color: red"
                          : "color: green"
                      }
                    >
                      $ {item.maxBidAmount}
                    </td>
                    <td>
                      <a href={`/item/preview/${item.itemId}`}>VIEW</a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="no-items-view">
                <td colSpan={6}>
                  <h1>You have not placed any bids.</h1>
                  <a id="start-selling" href="/shop">
                    START BIDDING
                  </a>
                </td>
              </tr>
            )}
          </table>
        </div>
      )}
      {activeTab == SETTINGS_TAB && (
        <div className="settings-tab">
          <div className="settings-account-section">
            <h1>Account</h1>
            <span>Do you want to deactivate your account?</span>
            <br />
            <br />
            <button onClick={userService.deactivateAccount}>DEACTIVATE</button>
          </div>
        </div>
      )}
      <div className="clear-space-for-footer"></div>
      <Footer />
    </div>
  );
}

export default AccountPage;
