import React from "react";
import PropTypes, { func } from "react-proptypes";

// sub-components
import Collapse from "./Collapse/Collapse";
import Item from "./Item/Item";
import Link from "./Link/Link";
import Brand from "./Brand/Brand";
import Toggle from "./Toggle/Toggle";

import "./Navbar.scss";

function wrapCollpase(element, calcNewChildProps, extraProps) {
  console.log("wrapCollapse Called");
  //   console.log("child element", element);
  //   console.log("calcNewChildProps", calcNewChildProps);
  //   console.log("extraprops", extraProps);
  return React.cloneElement(element, {
    ...calcNewChildProps(element),
    ...extraProps,
  });
}
function wrapToggle(element, calcNewChildProps, extraProps) {
  return React.cloneElement(element, calcNewChildProps);
}
function computeKey(key, id, index) {
  return key || id || index || 0;
}
export default function Navbar(props) {
  const [toggleRequested, updateToggleRequest] = React.useState(false);
  let children = props.children.map((child, index) => {
    console.log(child.key || child.props.id || index || child);
    let key = computeKey(child.key, child.props.id, index);
    if (child.type === Collapse) {
      return React.cloneElement(child, {
        prevState: child,
        toggleRequested,
        updateToggleRequest,
        key,
      });
    } else if (child.type === Toggle) {
      return React.cloneElement(child, {
        onClick: () => updateToggleRequest(true),
        key,
      });
    }
    return React.cloneElement(child, {
      key,
    });
  });
  return (
    <div id={props.id || ""} className={"navbar" + props.className}>
      {children}
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
Navbar.Toggle = Toggle;
