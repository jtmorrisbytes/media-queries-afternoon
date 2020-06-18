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
      <Item key={child?.props.id || child?.props?.key || index}>{child}</Item>
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

let style = {};

function calcAnimFrame(ref, animHeight, setAnimHeight) {}
class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  calcMaxHeight() {
    if (this?.listRef?.current) {
      let e = this.listRef.current;
      let s = window.getComputedStyle(e);
      return [
        e.clientHeight,

        s.paddingTop,
        s.paddingBottom,
        s.borderTop,
        s.borderBottom,
        s.marginTop,
        s.marginBottom,
      ].reduce((a, c) => {
        return a + (parseInt(c) || 0);
      }, 0);
    }
    return 0;
  }
  render() {
    let className = this.props.className || "";
    return (
      <nav
        style={{ ...style }}
        onAnimationEnd={this.props.onAnimationEnd}
        onClick={this.props.onClick}
        className={`navbar-collapse ${this.props.animState} ${className}`}
      >
        <ul ref={this.listRef}>{renderListItems(this.props.children)}</ul>
      </nav>
    );
  }
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
