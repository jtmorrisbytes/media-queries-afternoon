import React, { forwardRef } from "react";
import PropTypes, { func } from "react-proptypes";

// sub-components
import Collapse from "./Collapse/Collapse";
import Item from "./Item/Item";
import Link from "./Link/Link";
import Brand from "./Brand/Brand";
import Toggle from "./Toggle/Toggle";
import Container from "../Container/Container";

import "./Navbar.scss";

const ANIMATION_STATES = {
  COLLAPSED: "collapsed",
  COLLAPSING: "collapsing",
  EXPANDING: "expanding",
  EXPANDED: "expanded",
};

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
function NoOpComponent(props) {
  return null;
}

function wrapToggle(element, calcNewChildProps, extraProps) {
  return React.cloneElement(element, calcNewChildProps);
}
function computeKey(key, id, index) {
  return key || id || index || 0;
}
function updateAnimState(animState, setAnimState) {
  console.log("updateAnimState Requested");
  console.log(animState, setAnimState);
  if (animState === ANIMATION_STATES.COLLAPSED) {
    setAnimState(ANIMATION_STATES.EXPANDED);
  } else if (animState === ANIMATION_STATES.EXPANDED) {
    setAnimState(ANIMATION_STATES.COLLAPSED);
  } else {
    setAnimState(ANIMATION_STATES.COLLAPSED);
  }
}

export default function Navbar(props) {
  let children = [...props.children];
  const [toggleRequested, updateToggleRequest] = React.useState(false);
  const [animState, setAnimState] = React.useState(ANIMATION_STATES.COLLAPSED);
  let ToggleElem = null;
  let CollapseElem = null;
  console.dir(children);
  for (let index = children.length - 1; index > 0; index--) {
    let child = children[index];
    console.log("index", index);
    if (child.type === Brand) {
      console.log("found brand");
    } else if (child.type === Toggle) {
      console.log("found toggle");
      ToggleElem = React.cloneElement(child, {
        onClick: updateAnimState.bind(null, animState, setAnimState),
      });
      children.splice(index, 1);
    } else if (child.type === Collapse) {
      console.log("found collapse");
      CollapseElem = React.cloneElement(child, {
        animState,
      });
      children.splice(index, 1);
    }
    if (ToggleElem && CollapseElem) {
      break;
    }
  }

  return (
    <div id={props.id || ""} className={"navbar " + props.className}>
      <Container>
        {children}
        {ToggleElem}
        {CollapseElem}
      </Container>
    </div>
  );
}

Navbar.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};
Navbar.ANIMATION_STATES = ANIMATION_STATES;
Navbar.Collapse = Collapse;
Navbar.Item = Item;
Navbar.Link = Link;
Navbar.Brand = Brand;
Navbar.Toggle = Toggle;
