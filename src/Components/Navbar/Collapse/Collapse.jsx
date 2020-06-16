import React from "react";
import Item from "../Item/Item";
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
export default function Collapse(props) {
  let className = props.className || "";
  console.log(Array.isArray(props.children));
  return (
    <nav className={"navbar-collapse" + className}>
      <ul>{renderListItems(props.children)}</ul>
    </nav>
  );
}
