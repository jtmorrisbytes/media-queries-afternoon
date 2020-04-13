import React from "react";

import "./Header.scss";
export default class Header extends React.Component {
  state = {
    showNav: false,
  };
  toggle() {
    // con;
    this.setState({ showNav: !this.state.showNav });
  }
  render() {
    return (
      <header className="Header Component">
        <div className="container">
          <div className="navbar">
            <div className="col">
              <span>Start Bootstrap</span>
            </div>
            <div className="col">
              <nav className={`show-${this.state.showNav}`}>
                <a>Services</a>
                <a>Portfolio</a>
                <a>About</a>
              </nav>
              <button onClick={this.toggle.bind(this)}>Menu</button>
            </div>
          </div>
          <div className="intro">
            <h3>Welcome to our Studio!</h3>
            <h1>It's nice to meet you</h1>
            <a href="#">Tell me more</a>
          </div>
        </div>
      </header>
    );
  }
}
