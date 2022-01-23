import api from "../Helpers/api";
import authService from "../Auth/auth.service";
import statusCodes from "../Helpers/status-codes";

const getPublicContent = () => {
  return api.get("v1/test/all");
};

const getSellerContent = () => {
  return api.get("v1/test/seller");
};

const getItemData = (itemId) => {
  return api.get("v1/item/" + itemId);
};

const placeBid = (itemId, amount) => {
  return api.post("v1/bid/place/" + itemId, { amount });
};

const getPersonalInfo = () => {
  return api.get(`v1/user/personal-info/`);
};

const changePersonalInfo = (personalInfo) => {
  return api.put(`v1/user/personal-info/`, personalInfo);
};

const deactivateAccount = () => {
  api.put("v1/user/deactivate").then((response) => {
    if (response.status == statusCodes.OK) {
      authService.logout();
    }
  });
};

export default {
  getPublicContent,
  getSellerContent,
  getItemData,
  placeBid,
  getPersonalInfo,
  changePersonalInfo,
  deactivateAccount,
};
