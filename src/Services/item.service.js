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
  let route = "v1/item/search?";
  let params = new URLSearchParams();

  params.set("category", "");
  categories.map((category) => {
    params.append("category", category);
  });

  params.set("subcategory", "");
  subcategories.map((subcategory) => {
    params.append("subcategory", subcategory);
  });

  params.set("minPrice", minPrice);
  params.set("maxPrice", maxPrice);
  params.set("search", search);

  return api.get(route + params);
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
