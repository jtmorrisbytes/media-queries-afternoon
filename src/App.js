import React from "react";
import logo from "./logo.svg";
import Navbar from "./Components/Navbar/Navbar";

import "./App.scss";

import Header from "./Components/Header/Header";
function App() {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand>this is some brand text</Navbar.Brand>
        <Navbar.Toggle>Menu</Navbar.Toggle>
        <Navbar.Collapse>
          <Navbar.Link href="https://www.google.com">item 1</Navbar.Link>
          <Navbar.Link href="https://www.google.com">item 2</Navbar.Link>
          <Navbar.Link href="https://www.google.com">item 3</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {/* <Header /> */}
    </div>
  );
}

export default App;
