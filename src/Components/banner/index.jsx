import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./index.scss";

function Banner(props) {
  return (
    <div className="banner">
      {props.title}
      <span className="banner-path">
        <span className="banner-base-path">{props.base}</span>
        <FontAwesomeIcon className="banner-arrow" icon={faArrowRight} />{" "}
        <span className="banner-current-path">{props.current}</span>
      </span>
    </div>
  );
}

export default Banner;
