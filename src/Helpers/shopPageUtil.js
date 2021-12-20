export const CATEGORY = "Category";
export const SUBCATEGORY = "Subcategory";
export const PRICE_RANGE = "Price range";
export const DEFAULT_SORT = "DEFAULT_SORT";
export const DEFAULT_DIRECTION = "ASC";
export const GRID_VIEW = "grid";
export const LIST_VIEW = "list";

export const SORTING_TYPES = [
  {
    text: "Default sorting",
    value: "DEFAULT_SORT",
    direction: "ASC",
  },
  {
    text: "Sort by newness",
    value: "NEWNESS_SORT",
    direction: "DESC",
  },
  {
    text: "Sort by time left",
    value: "TIME_LEFT_SORT",
    direction: "DESC",
  },
  {
    text: "Sort by price (high-low)",
    value: "PRICE_SORT",
    direction: "DESC",
  },
  {
    text: "Sort by price (low-high)",
    value: "PRICE_SORT",
    direction: "ASC",
  },
];
