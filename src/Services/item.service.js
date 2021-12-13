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

const getFilteredItems = (
  categories,
  subcategories,
  minPrice,
  maxPrice,
  search
) => {
  let route = "v1/item/filter?";

  route += "category=";
  categories.map((category) => {
    route += category + ",";
  });
  route = route.slice(0, -1);
  route += "&";

  route += "subcategory=";
  subcategories.map((subcategory) => {
    route += "," + subcategory;
  });
  route += "&";

  route += "minprice=" + minPrice + "&";
  route += "maxprice=" + maxPrice + "&";
  route += "search=" + search;

  return api.get(route);
};

const getItemPriceLimits = () => {
  return api.get("v1/item/priceLimits");
};

export default {
  getNewArrivals,
  getItemData,
  getLastChance,
  getFilteredItems,
  getItemPriceLimits,
};
