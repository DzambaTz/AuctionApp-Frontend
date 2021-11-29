import React from "react";
import "./index.scss";

const GridView = (props) => {
  const gridStyle =
    "grid-template-columns: repeat(" +
    props.columns +
    ", 25%);" +
    "grid-column-gap:" +
    props.columnGap +
    ";margin-left:" +
    props.marginLeft;

  return (
    <div className="grid-view" Style={gridStyle}>
      {props.children}
    </div>
  );
};

export default GridView;
