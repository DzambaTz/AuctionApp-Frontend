import Footer from "../../Components/footer";
import GridView from "../../Components/grid-view";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import { useState, useEffect } from "react";
import itemService from "../../Services/item.service";
import ItemCard from "../../Components/item-card";
import { useParams } from "react-router";

import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import testData from "../../Helpers/test-data";
import statusCodes from "../../Helpers/status-codes";
import MultiRangeSlider from "../../Components/multi-range-slider";
import {
  CATEGORY,
  SUBCATEGORY,
  PRICE_RANGE,
  SORTING_TYPES,
  DEFAULT_SORT,
} from "../../Helpers/shopPageUtil";

function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function ShopPage() {
  const pathCategory = useParams().category;
  let searchInput = useParams().input;
  searchInput = searchInput ? searchInput : "";
  const [filteredItems, setFilteredItems] = useState("");
  const [category, setCategory] = useState(
    pathCategory ? [titleCase(pathCategory)] : []
  );
  const [activeFilters, setActiveFilters] = useState(
    pathCategory ? [{ title: CATEGORY, value: titleCase(pathCategory) }] : []
  );
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPriceSlider, setMinPriceSlider] = useState(0);
  const [maxPriceSlider, setMaxPriceSlider] = useState(0);
  const [minPriceLabel, setMinPriceLabel] = useState(0);
  const [maxPriceLabel, setMaxPriceLabel] = useState(0);
  const [selectedSorting, setSelectedSorting] = useState(DEFAULT_SORT);

  const sliderRange = `$${minPriceSlider}-$${maxPriceSlider}`;

  useEffect(() => {
    itemService.getItemPriceLimits().then((response) => {
      if (response.status == statusCodes.OK) {
        setMinPrice(response.body[0]);
        setMaxPrice(response.body[1]);
      }
    });
  }, []);

  useEffect(() => {
    itemService
      .getFilteredItems(
        category,
        subcategory,
        minPriceSlider,
        maxPriceSlider,
        searchInput,
        selectedSorting
      )
      .then((response) => {
        if (response.status == statusCodes.OK) {
          setFilteredItems(response.body);
        } else {
          setFilteredItems([]);
        }
      });
  }, [activeFilters, minPriceSlider, maxPriceSlider, selectedSorting]);

  useEffect(() => {
    if (!activeFilters.filter((filter) => filter.title == PRICE_RANGE).length) {
      setActiveFilters(
        activeFilters.concat({
          title: PRICE_RANGE,
          value: sliderRange,
        })
      );
    } else {
      const priceFilterPos = activeFilters.findIndex(
        (filter) => filter.title == PRICE_RANGE
      );
      activeFilters[priceFilterPos].value = sliderRange;
    }
  }, [minPriceSlider, maxPriceSlider]);

  const removeFilter = (title, value) => {
    setActiveFilters(
      activeFilters.filter((filter) => {
        return filter.title != title || filter.value != value;
      })
    );
    if (title == CATEGORY) {
      setCategory(category.filter((cat) => cat !== value));
    } else if (title == SUBCATEGORY) {
      setSubcategory(subcategory.filter((subcat) => subcat !== value));
      document.getElementById(value).checked = false;
    } else if (title == PRICE_RANGE) {
      setMaxPriceSlider(maxPrice);
      setMinPriceSlider(minPrice);
      setMaxPriceLabel(maxPrice);
      setMinPriceLabel(minPrice);
    }
  };

  const addCategoryFilter = (newCategory) => {
    if (!category.includes(newCategory)) {
      setCategory(category.concat(newCategory));
      if (
        !activeFilters.filter((filter) => {
          return filter.title == CATEGORY && filter.value == newCategory;
        }).length
      ) {
        setActiveFilters(
          activeFilters.concat({
            title: CATEGORY,
            value: newCategory,
          })
        );
      }
    }
  };

  const expandOrCollapseCategory = (categoryName, e) => {
    if (e.target.innerText == "+") {
      setExpandedCategories(expandedCategories.concat(categoryName));
      [...document.getElementsByName(categoryName)].map(
        (element) => (element.style.display = "block")
      );
    } else {
      setExpandedCategories(
        expandedCategories.filter((cat) => cat !== categoryName)
      );
      [...document.getElementsByName(categoryName)].map(
        (element) => (element.style.display = "none")
      );
    }
    e.target.innerText = e.target.innerText == "+" ? "–" : "+";
  };

  const addOrRemoveSubcategoryFilter = (categoryName, subcategoryName, e) => {
    if (e.target.checked) {
      setSubcategory(subcategory.concat(categoryName + "/" + subcategoryName));
      setActiveFilters(
        activeFilters.concat({
          title: SUBCATEGORY,
          value: categoryName + "/" + subcategoryName,
        })
      );
    } else {
      setSubcategory(
        subcategory.filter(
          (subcat) => subcat !== categoryName + "/" + subcategoryName
        )
      );
      setActiveFilters(
        activeFilters.filter(
          (filter) =>
            filter.title !== SUBCATEGORY ||
            filter.value !== categoryName + "/" + subcategoryName
        )
      );
    }
  };

  const changePriceRange = (min, max) => {
    setMinPriceSlider(min);
    setMaxPriceSlider(max);
  };

  const changePriceLabel = (min, max) => {
    setMinPriceLabel(min);
    setMaxPriceLabel(max);
  };

  const numberOfItemsInSubcategory = (cat, subcat) => {
    return filteredItems.filter(
      (item) => item.category == cat.name && item.subcategory == subcat
    ).length;
  };

  const changeSorting = (e) => {
    setSelectedSorting(e.target.value);
  };

  return (
    <div className="shop-page-container">
      <NavbarBlack />
      <NavbarWhite page="shop" />
      {searchInput != "" && (
        <div className="search-result-banner">
          Shop <FontAwesomeIcon className="banner-arrow" icon={faArrowRight} />{" "}
          <span>Search results for {searchInput}</span>
        </div>
      )}
      <div className="filters-and-categories">
        <div className="product-categories">
          <h1>Product categories</h1>
          {testData.categories.map((category) => {
            return (
              <div>
                <h2
                  onClick={() => {
                    addCategoryFilter(category.name);
                  }}
                >
                  {category?.name}
                </h2>{" "}
                <button
                  onClick={(e) => {
                    expandOrCollapseCategory(category.name, e);
                  }}
                >
                  +
                </button>
                {category.subcategories.map((subcat) => {
                  return (
                    <div name={category.name} className="subcategory">
                      <input
                        onChange={(e) =>
                          addOrRemoveSubcategoryFilter(category.name, subcat, e)
                        }
                        type="checkbox"
                        id={category.name + "/" + subcat}
                      />
                      <div Style="padding-top: 2px">
                        {subcat} (
                        {(filteredItems &&
                          numberOfItemsInSubcategory(category, subcat)) ||
                          0}
                        )
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {minPrice > 0 && maxPrice > 0 && (
          <div className="price-filter">
            <h1>Price Range</h1>
            <input
              type="text"
              className="price-input"
              Style="margin-right: 15%;"
              value={`$${Math.round(minPriceLabel)}`}
              disabled="true"
            />
            <input
              type="text"
              className="price-input"
              value={`$${Math.round(maxPriceLabel)}`}
              disabled="true"
            />
            <br />
            <br />
            <br />
            <br />
            <MultiRangeSlider
              min={minPrice}
              max={maxPrice}
              onRelease={({ min, max }) => changePriceRange(min, max)}
              onChange={({ min, max }) => changePriceLabel(min, max)}
            />
            <h2>
              ${minPriceLabel}-${maxPriceLabel}
            </h2>
            <h3>
              The average price is ${Math.floor((minPrice + maxPrice) / 2)}
            </h3>
          </div>
        )}
      </div>
      <div className="product-list">
        <div className="active-filters">
          {activeFilters &&
            activeFilters.map((filter) => {
              return (
                <div className="filter">
                  <h1 className="filter-title">{filter.title}</h1>
                  <h2 className="filter-value">{filter.value}</h2>
                  <button
                    className="remove-filter"
                    onClick={() => {
                      removeFilter(filter.title, filter.value);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  &nbsp;
                </div>
              );
            })}
        </div>
        <div className="sort-and-view-select">
          <div className="sorting-selector">
            <select onChange={changeSorting} value={selectedSorting}>
              {SORTING_TYPES.map((type) => {
                return <option value={type.value}>{type.text}</option>;
              })}
            </select>
          </div>
          <div className="view-selector"></div>
        </div>

        <GridView columns={3} columnGap="15.5%">
          {filteredItems &&
            filteredItems.map((item) => {
              return (
                <ItemCard
                  image={item.images[0] + ".jpeg"}
                  title={item.name}
                  price={item.startPrice}
                  link={`/item/preview/${item.id}`}
                />
              );
            })}
        </GridView>
      </div>
      <div className="clear-space-for-footer"></div>
      <Footer />
    </div>
  );
}

export default ShopPage;
