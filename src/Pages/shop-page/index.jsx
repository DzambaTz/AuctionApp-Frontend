import react from "react";
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
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import testData from "../../Helpers/test-data";
import statusCodes from "../../Helpers/status-codes";
import MultiRangeSlider from "../../Components/multi-range-slider";
import { act } from "react-dom/test-utils";

function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function ShopPage() {
  const CATEGORY = "Category";
  const SUBCATEGORY = "Subcategory";
  const PRICE_RANGE = "Price range";

  const pathCategory = useParams().category;

  const [newArrivals, setNewArrivals] = useState("");
  const [filteredItems, setFilteredItems] = useState(newArrivals);
  const [category, setCategory] = useState(
    pathCategory ? [titleCase(pathCategory)] : []
  );
  const [activeFilters, setActiveFilters] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPriceSlider, setMinPriceSlider] = useState(0);
  const [maxPriceSlider, setMaxPriceSlider] = useState(0);

  useEffect(() => {
    itemService.getNewArrivals().then((response) => {
      if (response.status == statusCodes.OK) setNewArrivals(response.body);
      setMinPrice(
        response.body.reduce((prev, curr) =>
          prev.startPrice < curr.startPrice ? prev : curr
        ).startPrice
      );
      setMaxPrice(
        response.body.reduce((prev, curr) =>
          prev.startPrice > curr.startPrice ? prev : curr
        ).startPrice
      );
    });
  }, []);

  useEffect(() => {
    if (newArrivals && category.length != 0) {
      setFilteredItems(
        newArrivals.filter((item) => {
          return category.includes(item.category);
        })
      );
      let newFilters = [];
      category.map((cat) => {
        if (
          !activeFilters.some(
            (filter) => filter.title === CATEGORY && filter.value === cat
          )
        ) {
          newFilters.push({ title: CATEGORY, value: titleCase(cat) });
        }
      });
      setActiveFilters(activeFilters.concat(newFilters));
    } else {
      setFilteredItems(newArrivals);
    }
  }, [newArrivals, category]);

  useEffect(() => {
    if (subcategory.length != 0) {
      let newFilters = [];
      subcategory.map((subcat) => {
        if (
          !activeFilters.some(
            (filter) => filter.title === SUBCATEGORY && filter.value === subcat
          )
        ) {
          newFilters.push({ title: SUBCATEGORY, value: subcat });
        }
      });
      setActiveFilters(activeFilters.concat(newFilters));
    }
  }, [subcategory]);

  useEffect(() => {
    if (newArrivals && activeFilters.length != 0) {
      setFilteredItems(
        newArrivals.filter((item) => {
          if (activeFilters.some((filter) => filter.title == PRICE_RANGE)) {
            if (
              item.startPrice >= minPriceSlider &&
              item.startPrice <= maxPriceSlider
            ) {
              if (
                category.includes(item.category) ||
                subcategory.includes(item.category + "/" + item.subcategory)
              ) {
                return true;
              } else {
                if (category.length == 0 && subcategory.length == 0) {
                  return true;
                }
              }
            } else {
              return false;
            }
          } else {
            if (
              category.includes(item.category) ||
              subcategory.includes(item.category + "/" + item.subcategory)
            ) {
              return true;
            } else {
              if (category.length == 0 && subcategory.length == 0) {
                return true;
              }
            }
          }
        })
      );
    } else {
      setFilteredItems(newArrivals);
    }
  }, [activeFilters]);

  useEffect(() => {
    if (!activeFilters.some((filter) => filter.title === PRICE_RANGE)) {
      setActiveFilters(
        activeFilters.concat({
          title: PRICE_RANGE,
          min: minPriceSlider,
          max: maxPriceSlider,
          value: "$" + minPriceSlider + "-$" + maxPriceSlider,
        })
      );
    } else {
      let priceFilter = activeFilters.find(
        (filter) => filter.title === PRICE_RANGE
      );
      let newActiveFilters = activeFilters.filter(
        (filter) => filter.title !== PRICE_RANGE
      );
      priceFilter = {
        title: PRICE_RANGE,
        min: minPriceSlider,
        max: maxPriceSlider,
        value: "$" + minPriceSlider + "-$" + maxPriceSlider,
      };
      setActiveFilters(newActiveFilters.concat(priceFilter));
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
    }
    if (title == SUBCATEGORY) {
      setSubcategory(subcategory.filter((subcat) => subcat !== value));
      document.getElementById(value).checked = false;
    }
  };

  const addCategoryFilter = (newCategory) => {
    if (!category.includes(newCategory))
      setCategory(category.concat(newCategory));
  };

  const expandOrCollapseCategory = (categoryName, e) => {
    console.log(minPrice, maxPrice);
    if (e.target.innerText == "+") {
      setExpandedCategories(expandedCategories.concat(categoryName));
    } else {
      setExpandedCategories(
        expandedCategories.filter((cat) => cat !== categoryName)
      );
    }
    e.target.innerText = e.target.innerText == "+" ? "–" : "+";
  };

  const addOrRemoveSubcategoryFilter = (categoryName, subcategoryName, e) => {
    if (e.target.checked) {
      setSubcategory(subcategory.concat(categoryName + "/" + subcategoryName));
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

  return (
    <div>
      <NavbarBlack />
      <NavbarWhite page="shop" />
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
                  {category.name}
                </h2>{" "}
                <button
                  onClick={(e) => {
                    expandOrCollapseCategory(category.name, e);
                  }}
                >
                  +
                </button>
                {expandedCategories.includes(category.name) &&
                  category.subcategories.map((subcat) => {
                    return (
                      <div className="subcategory">
                        <input
                          onChange={(e) =>
                            addOrRemoveSubcategoryFilter(
                              category.name,
                              subcat,
                              e
                            )
                          }
                          type="checkbox"
                          id={category.name + "/" + subcat}
                        />
                        <div Style="padding-top: 2px">
                          {subcat} (
                          {
                            newArrivals.filter(
                              (item) =>
                                item.category == category.name &&
                                item.subcategory == subcat
                            ).length
                          }
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
              Style="margin-right: 14%;"
              value={"$" + minPriceSlider}
            />
            <input
              type="text"
              className="price-input"
              value={"$" + maxPriceSlider}
            />
            <br />
            <br />
            <br />
            <br />

            <MultiRangeSlider
              min={minPrice}
              max={maxPrice}
              onChange={({ min, max }) => changePriceRange(min, max)}
            />
            <h2>
              ${minPriceSlider}-${maxPriceSlider}
            </h2>
            <h3>
              The average price is ${Math.floor((minPrice + maxPrice) / 2)}
            </h3>
          </div>
        )}
      </div>
      <div className="product-list">
        <div className="active-filters">
          {activeFilters.length != 0 &&
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

      <Footer />
    </div>
  );
}

export default ShopPage;
