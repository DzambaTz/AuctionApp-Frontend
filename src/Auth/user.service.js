import api from "../Helpers/api";
import authHeader from "../Helpers/auth-header";

const getPublicContent = () => {
  return api.get("v1/test/all");
};

const getSellerContent = () => {
  return api.get("v1/test/seller", { headers: authHeader() });
};

const getItemData = (itemId) => {
  return api
    .get("v1/item/" + itemId)
    .then((response) => {
      localStorage.setItem("item", JSON.stringify(response.data));
    })
    .catch((error) => {
      localStorage.removeItem("item");
    });
};

const placeBid = (itemId, amount) => {
  return api.post(
    "v1/bid/place/" + itemId,
    { amount: amount },
    {
      headers: authHeader(),
    }
  );
};

export default {
  getPublicContent,
  getSellerContent,
  getItemData,
  placeBid,
};
