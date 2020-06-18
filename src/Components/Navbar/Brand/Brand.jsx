import React from "react";
import PropTypes from "react-proptypes";
import "./Brand.scss";
const CLASS_NAME = "navbar-brand";

export default function Brand(props) {
  if (props.src) {
    return <img className={CLASS_NAME} src={props.src} alt={props.alt || ""} />;
  } else {
    return <div className={CLASS_NAME}>{props.children}</div>;
  }
}
