import React, { forwardRef } from "react";
import PropTypes, { func, element } from "react-proptypes";

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
  return React.cloneElement(element, {
    ...calcNewChildProps(element),
    ...extraProps,
  });
}
function updateAnimState(animState, setAnimState, ref) {
  if (animState === ANIMATION_STATES.COLLAPSED) {
    setAnimState(ANIMATION_STATES.EXPANDING);
    requestAnimationFrame((time) => {
      expandNavList(time, ref, animState, setAnimState);
    });
  } else if (animState === ANIMATION_STATES.EXPANDED) {
    setAnimState(ANIMATION_STATES.COLLAPSING);
    requestAnimationFrame((time) => {
      collapseNavList(time, ref, animState, setAnimState);
    });
  } else {
    setAnimState(ANIMATION_STATES.COLLAPSED);
  }
}
function expandNavList(
  currentTime,
  ref,
  animState,
  setAnimState,
  startTime = null,
  duration = 500,
  ls = null,
  collapse = null
) {
  startTime = startTime || currentTime;
  ls =
    ls ||
    window.getComputedStyle(ref?.current?.querySelector(".navbar-collapse ul"));
  collapse = collapse || ref.current.querySelector(".navbar-collapse");
  if (collapse.classList.contains(ANIMATION_STATES.EXPANDING)) {
    let cs = window.getComputedStyle(collapse);
    let csComputedHeight = parseFloat(cs.height);
    if (collapse && cs && ls) {
      let th =
        parseFloat(ls.height) +
        parseFloat(ls.marginTop) +
        parseFloat(ls.paddingTop) +
        parseFloat(ls.borderTop) +
        parseFloat(ls.borderBottom) +
        parseFloat(ls.paddingBottom) +
        parseFloat(ls.marginBottom);
      let inc = th * ((currentTime - startTime) / duration);
      collapse.style.height = `${Math.min(inc, th)}px`;
      if (inc > th) {
        collapse.style = undefined;
        setAnimState(ANIMATION_STATES.EXPANDED);
        return;
      }
      requestAnimationFrame((time) =>
        expandNavList(
          time,
          ref,
          animState,
          setAnimState,
          startTime,
          duration,
          ls,
          collapse
        )
      );
    }
  } else {
    collapse.style = undefined;
    setAnimState(ANIMATION_STATES.EXPANDED);
  }
}
function collapseNavList(
  time,
  ref,
  animState,
  setAnimState,
  startTime,
  startHeight,
  cs,
  collapse,
  duration = 500
) {
  collapse = collapse || ref?.current?.querySelector(".navbar-collapse");
  cs = cs || window.getComputedStyle(collapse);
  if (collapse == null || cs == null) {
    setAnimState(ANIMATION_STATES.COLLAPSED);
    return;
  }
  startTime = startTime || time;
  startHeight = startHeight || parseFloat(cs.height);
  let th = startHeight;
  collapse.style.height = `${Math.max(th, 0)}px`;
  if (th > 0) {
    requestAnimationFrame((time) => {
      collapseNavList(
        time,
        ref,
        animState,
        setAnimState,
        startTime,
        startHeight,
        cs,
        collapse,
        duration
      );
    });
  } else {
    setAnimState(ANIMATION_STATES.COLLAPSED);
  }

  // requestAnimationFrame((time) => {
  //   collapseNavList(time, ref, animState, setAnimState, list, collapse);
  // });
}
export default function Navbar(props) {
  let children = [...props.children];
  const [animState, setAnimState] = React.useState(ANIMATION_STATES.COLLAPSED);
  const ref = React.useRef();
  let ToggleElem = null;
  let CollapseElem = null;
  for (let index = children.length - 1; index > 0; index--) {
    let child = children[index];
    if (child.type === Brand) {
    } else if (child.type === Toggle) {
      ToggleElem = React.cloneElement(child, {
        onClick: updateAnimState.bind(this, animState, setAnimState, ref),
        // ref: collapseRef,
      });
      children.splice(index, 1);
    } else if (child.type === Collapse) {
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
    <div ref={ref} id={props.id || ""} className={"navbar " + props.className}>
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
