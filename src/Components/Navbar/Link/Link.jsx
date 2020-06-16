import React from "react";
import PropTypes from "react-proptypes";

import "./Link.scss";

export default function Link(props) {
  let id = props.id || "";
  let href = props.href || "";
  let className = props.className || "";
  return (
    <a id={id} href={href} className={"navbar-link " + className}>
      {props.children}
    </a>
  );
}
Link.propTypes = {
  href: PropTypes.string,
};
