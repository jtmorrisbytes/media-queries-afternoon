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
          <Navbar.Link href="https://www.google.com">Services</Navbar.Link>
          <Navbar.Link href="https://www.google.com">Portfolio</Navbar.Link>
          <Navbar.Link href="https://www.google.com">About</Navbar.Link>
          <Navbar.Link href="https://www.google.com">Team</Navbar.Link>
          <Navbar.Link href="https://www.google.com">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {/* <Header /> */}
    </div>
  );
}

export default App;
