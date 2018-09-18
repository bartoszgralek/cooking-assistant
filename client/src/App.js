import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarMobile" aria-controls="navbarMobile" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav-left">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>

        <a className="navbar-brand mx-auto" href="#">
          <div id="logo"></div>
        </a>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>

        <div className="collapse" id="navbarMobile">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Mobile Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mobile Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mobile Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mobile Link</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default App;
