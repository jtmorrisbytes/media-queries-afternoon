import React from "react";
import PropTypes from "react-proptypes";

// sub-components
import Collapse from "./Collapse/Collapse";
import Item from "./Item/Item";
import Link from "./Link/Link";
import Brand from "./Brand/Brand";

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
Navbar.Brand = Brand;
Navbar.Toggle = function () {
  return null;
};
