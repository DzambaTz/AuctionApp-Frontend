import api from "../Helpers/api";

const getNewArrivals = () => {
  return api.get("v1/item/newArrivals");
};

const getLastChance = () => {
  return api.get("v1/item/lastChance");
};

const getItemData = (itemId) => {
  return api.get("v1/item/" + itemId);
};

export default {
  getNewArrivals,
  getItemData,
  getLastChance,
};
