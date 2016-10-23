import React, {Component} from 'react';
import '../css/layout.css'
import logo from '../content/logo.svg';

export default class Header extends Component {
  render() {
    return(
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Resocket</h2>
      </div>
    );
  }
}