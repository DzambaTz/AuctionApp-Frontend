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

function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function ShopPage() {
  const CATEGORY = "Category";

  const [newArrivals, setNewArrivals] = useState("");
  const [filteredItems, setFilteredItems] = useState(newArrivals);
  const [category, setCategory] = useState([titleCase(useParams().category)]);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    itemService.getNewArrivals().then((response) => {
      if (response.status == statusCodes.OK) setNewArrivals(response.body);
    });
  }, []);

  useEffect(() => {
    console.log(process.env.BASE_URL);
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

  const removeFilter = (title, value) => {
    setActiveFilters(
      activeFilters.filter((filter) => {
        return filter.title != title || filter.value != value;
      })
    );
    if (title == CATEGORY) {
      setCategory(category.filter((cat) => cat !== value));
    }
  };

  const addOrRemoveCategoryFilter = (newCategory) => {
    if (!category.includes(newCategory))
      setCategory(category.concat(newCategory));
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
                <h2>{category.name}</h2>{" "}
                <button
                  onClick={() => {
                    addOrRemoveCategoryFilter(category.name);
                  }}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
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
