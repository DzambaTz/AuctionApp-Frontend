import api from "../Helpers/api";
import authHeader from "../Helpers/auth-header";

const getPublicContent = () => {
  return api.get("test/all");
};

const getSellerContent = () => {
  return api.get("test/seller", { headers: authHeader() });
};

export default {
  getPublicContent,
  getSellerContent,
};
