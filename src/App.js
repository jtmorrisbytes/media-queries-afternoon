import React from "react";
import Navbar from "./Components/Navbar/Navbar";

import "./App.scss";
import logo from "./navbar-logo.svg";
import Header from "./Components/Header/Header";
function App() {
  return (
    <div className="App">
      <Navbar className="dark">
        <Navbar.Brand src={logo} alt="Start Bootstrap" />
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
