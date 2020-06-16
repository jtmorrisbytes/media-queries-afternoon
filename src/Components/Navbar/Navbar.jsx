import React from "react";
import PropTypes from "react-proptypes";

import Collapse from "./Collapse/Collapse";
import Item from "./Item/Item";
import Link from "./Link/Link";

import "./Navbar.scss";

export default function Navbar(props) {
  return (
    <div id={props.id || ""} className={"navbar" + props.className}>
      {props.children}
    </div>
  );
}

Navbar.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

Navbar.Collapse = Collapse;
Navbar.Item = Item;
Navbar.Link = Link;
Navbar.Toggle = function () {
  return null;
};
