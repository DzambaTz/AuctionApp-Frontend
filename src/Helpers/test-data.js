import cardImage1 from "../Assets/Images/card-image-1.png";
import cardImage2 from "../Assets/Images/card-image-2.png";
import itemImage from "../Assets/Images/jacket-image-1.jpg";
import itemImage2 from "../Assets/Images/jacket-image-2.png";
import shoe from "../Assets/Images/featured-shoe.jpg";

const categories = [
  {
    name: "Fashion",
    path: "/shop/fashion",
    subcategories: ["Male", "Female", "Unisex", "Kids"],
  },
  {
    name: "Accessories",
    path: "/shop/accessories",
    subcategories: [1, 2, 3, 4],
  },
  {
    name: "Jewlery",
    path: "/shop/jewlery",
    subcategories: [1, 2, 3, 4],
  },
  {
    name: "Shoes",
    path: "/shop/shoes",
    subcategories: [1, 2, 3, 4],
  },
  {
    name: "Sportswear",
    path: "/shop/sportswear",
    subcategories: ["Male", "Female", "Unisex", "Kids"],
  },
  {
    name: "Home",
    path: "/shop/home",
    subcategories: [1, 2, 3, 4],
  },
  {
    name: "Electronics",
    path: "/shop/electronics",
    subcategories: [1, 2, 3, 4],
  },
  {
    name: "Mobile",
    path: "/shop/mobile",
    subcategories: [1, 2, 3, 4],
  },
  {
    name: "Computer",
    path: "/shop/computer",
    subcategories: [1, 2, 3, 4],
  },
];

const newArrivals = [
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage1,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
];

const lastChance = [
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
  {
    image: cardImage2,
    title: "Shoe collection",
    price: "59.00",
    link: "/item/preview/1",
  },
];

const itemPreviewImages = [
  itemImage,
  itemImage2,
  itemImage,
  itemImage2,
  itemImage,
];

export default {
  categories,
  newArrivals,
  lastChance,
  itemPreviewImages,
};
