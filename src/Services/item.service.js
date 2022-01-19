import api from "../Helpers/api";

const getNewArrivals = () => {
  return api.get("v1/item/new-arrivals");
};

const getLastChance = () => {
  return api.get("v1/item/last-chance");
};

const getItemData = (itemId) => {
  return api.get("v1/item/" + itemId);
};

const getFilteredItems = (
  categories,
  subcategories,
  minPrice,
  maxPrice,
  search,
  sort,
  direction
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
  params.set("sortBy", sort);
  params.set("direction", direction);
  params.set("pageNumber", 0);
  params.set("pageSize", 1000);

  return api.get(route + params);
};

const getItemPriceLimits = () => {
  return api.get("v1/item/price-limits");
};

const getActiveItems = () => {
  return api.get("v1/item/active-items");
};

const getSoldItems = () => {
  return api.get("v1/item/sold-items");
};

const getUserBidsItems = () => {
  return api.get("v1/bid/user-bids");
};

export default {
  getNewArrivals,
  getItemData,
  getLastChance,
  getFilteredItems,
  getItemPriceLimits,
  getActiveItems,
  getSoldItems,
  getUserBidsItems,
};
