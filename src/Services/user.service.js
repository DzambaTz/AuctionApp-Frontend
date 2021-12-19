import api from "../Helpers/api";
import authHeader from "../Helpers/auth-header";
import { IMAGE_API_URL } from "../Helpers/baseConfig";

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

const changeProfilePhoto = (encodedImage) => {
  return api.post(
    "image",
    {
      image: encodedImage,
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
      },
    },
    IMAGE_API_URL
  );
};

export default {
  getPublicContent,
  getSellerContent,
  getItemData,
  placeBid,
  changeProfilePhoto,
};
