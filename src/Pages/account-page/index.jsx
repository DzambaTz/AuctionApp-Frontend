import NavbarWhite from "../../Components/navbar-white";
import NavbarBlack from "../../Components/navbar-black";
import Footer from "../../Components/footer";
import Banner from "../../Components/banner";

import "./index.scss";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import {
  BIDS_TAB,
  PROFILE_TAB,
  SELLER_TAB,
  SETTINGS_TAB,
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
  const [dayOfBirth, setDayOfBirth] = useState("");
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

  useEffect(() => {
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
        setDayOfBirth(response.body.dateOfBirth?.split("/")[0]);
        setMonthOfBirth(response.body.dateOfBirth?.split("/")[1]);
        setYearOfBirth(response.body.dateOfBirth?.split("/")[2]);
        setGender(response.body.gender);
      }
    });
  }, []);

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
                  onChange={(e) => setDayOfBirth(e.target.value)}
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
      <div className="clear-space-for-footer"></div>
      <Footer />
    </div>
  );
}

export default AccountPage;
