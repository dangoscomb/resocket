import React, {Component} from 'react';
import Header from '../partials/Header';
import '../css/layout.css'

export default class extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
      </div>
    );
  }
}