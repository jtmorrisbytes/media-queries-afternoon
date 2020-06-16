import React from "react"


export default function Item(props){
    let className = props.className || "";
    let id = props.id || "";
    return <li id={id} className={"navbar-item" + className}>{props.children}</li>
}