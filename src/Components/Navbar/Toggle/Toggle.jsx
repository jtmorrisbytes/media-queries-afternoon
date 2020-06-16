import React from "react";
import "./Toggle.scss";

export default function Toggle(props) {
  return (
    <button onClick={props.onClick} type="button" className="navbar-toggle">
      {props.children}
    </button>
  );
}
