import React from "react";
import PropTypes from "react-proptypes";

import Item from "../Item/Item";

import "./Collapse.scss";

const COLLAPSED = "collapsed";
const COLLAPSING = "collapsing";
const EXPANDING = "expanding";
const EXPANDED = "expanded";
const DEFAULT = COLLAPSED;
function doToggle(animState, setAnimState) {
  if (animState === COLLAPSED) {
    return setAnimState(EXPANDING);
  } else if (animState === EXPANDED) {
    return setAnimState(COLLAPSING);
  }
  console.log("doToggle called");
}

function checkToggleDisabled(animState) {
  return animState === COLLAPSING || animState === EXPANDING;
}

function renderListItems(children = []) {
  return children.map((child, index) => {
    // console.log(
    //   child.name || "no name,",
    //   child.type || "no type",
    //   child.type.displayName
    // );
    if (child.type === Item) {
      return child;
    }
    return (
      <Item key={child?.props?.id || child?.props?.key || index}>{child}</Item>
    );
  });
}
function calcAnimHeight(element) {
  if (element) {
    let style = window.getComputedStyle(element);
    return [
      element.clientHeight,
      style.paddingTop,
      style.paddingBottom,
      style.marginTop,
      style.marginBottom,
    ].reduce((acc, val) => {
      return acc + (+String(val).match(/\d+/) || 0);
    }, 0);
  }
  return 0;
}

function calcAnimFrame(ref, animHeight, setAnimHeight) {}
function Collapse(props) {
  let className = props.className || "";
  const ref = React.useRef();
  const [animState, setAnimState] = React.useState(DEFAULT);
  const [animHeight, setAnimHeight] = React.useState(
    calcAnimHeight(ref?.current)
  );
  if (props.toggleRequested) {
    if (animState === COLLAPSED) {
      setAnimState(EXPANDING);
    } else if (animState === EXPANDED) {
      setAnimState(COLLAPSING);
    }
    props.updateToggleRequest(false);
  }
  if (animState === EXPANDING) {
    let stop = calcAnimHeight(ref.current);
    setTimeout(() => {
      if (animHeight < stop) {
        setAnimHeight(animHeight + 2);
      } else {
        setAnimHeight(stop);
        setAnimState(EXPANDED);
      }
    }, 1 / 60);
  } else if (animState === COLLAPSING) {
    let start = calcAnimHeight(ref.current);
    setTimeout(() => {
      if (animHeight > 0) {
        setAnimHeight(animHeight - 2);
      } else {
        setAnimHeight(0);
        setAnimState(COLLAPSED);
      }
    }, 1 / 60);
  }
  return (
    <nav
      style={{ height: `${animHeight}px` }}
      className={`navbar-collapse ${animState} ${className}`}
    >
      <ul ref={ref}>{renderListItems(props.children)}</ul>
    </nav>
  );
}
Collapse.animState = {
  COLLAPSED,
  COLLAPSING,
  EXPANDING,
  EXPANDED,
  DEFAULT,
};
Collapse.propTypes = {
  animState: PropTypes.string,
  setAnimState: PropTypes.func,
};
Collapse.doToggle = doToggle;
Collapse.checkToggleDisabled = checkToggleDisabled;
export default Collapse;
