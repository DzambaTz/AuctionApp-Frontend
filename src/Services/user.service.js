import api from "../Helpers/api";
import authHeader from "../Helpers/auth-header";
import { IMAGE_API_URL } from "../Helpers/baseConfig";
import authService from "../Auth/auth.service";

const getPublicContent = () => {
  return api.get("v1/test/all");
};

const getSellerContent = () => {
  return api.get("v1/test/seller", { headers: authHeader() });
};

const getItemData = (itemId) => {
  return api.get("v1/item/" + itemId);
};

const placeBid = (itemId, amount) => {
  return api.post("v1/bid/place/" + itemId, { amount });
};

const getProfilePhoto = () => {
  return api.get(`v1/user/profilePhoto/${authService.getCurrentUser().id}`);
};

const changeProfilePhoto = (imageURL) => {
  return api.put(`v1/user/profilePhoto/${authService.getCurrentUser().id}`, {
    url: imageURL,
  });
};

const getPersonalInfo = () => {
  return api.get(`v1/user/personalInfo/${authService.getCurrentUser().id}`);
};

const changePersonalInfo = (
  firstName,
  lastName,
  phoneNumber,
  gender,
  dateOfBirth,
  streetAddress,
  city,
  zipCode,
  state,
  country,
  nameOnCard,
  cardNumber,
  expirationDate,
  cvv
) => {
  return api.put(`v1/user/personalInfo/${authService.getCurrentUser().id}`, {
    firstName,
    lastName,
    phoneNumber,
    gender,
    dateOfBirth,
    streetAddress,
    city,
    zipCode,
    state,
    country,
    nameOnCard,
    cardNumber,
    expirationDate,
    cvv,
  });
};

export default {
  getPublicContent,
  getSellerContent,
  getItemData,
  placeBid,
  getProfilePhoto,
  changeProfilePhoto,
  getPersonalInfo,
  changePersonalInfo,
};
