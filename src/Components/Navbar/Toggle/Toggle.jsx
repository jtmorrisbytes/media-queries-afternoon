import React from "react";
import "./Toggle.scss";

export default function Toggle(props) {
  return (
    <button type="button" className="navbar-toggle">
      {props.children}
    </button>
  );
}
