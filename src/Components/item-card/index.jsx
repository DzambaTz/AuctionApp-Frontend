import React from "react";
import "./index.scss";

function ItemCard(props) {
  return (
    <div className="item-card">
      <a href="/about">
        <img src={props.image} alt="" />
        <h1>{props.title}</h1>
        <h2>
          Start from <span>${props.price}</span>
        </h2>
      </a>
    </div>
  );
}

export default ItemCard;
