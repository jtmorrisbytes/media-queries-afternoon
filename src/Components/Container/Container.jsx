import React from "react";

import "./Container.scss";

function Container(props) {
  let className = props.className || "";
  let type = props.fluid ? "container-fluid" : "container";
  return <div className={`${type} ${className}`.trim()}>{props.children}</div>;
}
export default Container;
