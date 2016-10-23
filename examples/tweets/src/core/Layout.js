import React, { Component, PropTypes } from 'react';
import Header from '../partials/Header';
import '../css/layout.css';

/* eslint-disable react/prefer-stateless-function */

export default class Layout extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
