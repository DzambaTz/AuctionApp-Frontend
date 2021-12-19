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
} from "@fortawesome/free-solid-svg-icons";
import userService from "../../Services/user.service";
import statusCodes from "../../Helpers/status-codes";

function AccountPage() {
  const pathTab = useParams().tab;
  const [activeTab, setActiveTab] = useState(pathTab ? pathTab : PROFILE_TAB);
  const [successful, setSuccessful] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
    "https://i.imgur.com/CDcRoOA.jpeg"
  );
  const [message, setMessage] = useState("");

  const changeImage = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      userService
        .changeProfilePhoto(reader.result.substring(23))
        .then((response) => {
          if (response.body.status == statusCodes.OK) {
            setProfilePhoto(response.body.data.link);
            setSuccessful(true);
            setMessage("Profile picture successfully changed!");
          } else {
            setSuccessful(false);
            setMessage("Error while trying to change the profile picture");
          }
        });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
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
            <input type="text" />
            <h1>Last Name</h1>
            <input type="text" />
            <h1>I am</h1>
            <select>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <h1>Date of birth</h1>
            <div className="date-of-birth-input">
              <input type="text" placeholder="DD" />
              <input type="text" placeholder="MM" />
              <input type="text" placeholder="YYYY" />
            </div>
            <h1>Phone number</h1>
            <input type="text" />
            <h1>Email address</h1>
            <input type="text" disabled="true" />
          </div>
        </div>
      )}
      <div className="clear-space-for-footer"></div>
      <Footer />
    </div>
  );
}

export default AccountPage;
