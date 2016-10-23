import React, {Component, PropTypes} from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);

  }

  getDefaultStyles() {
    return {
      boxSizing: 'border-box',
      minHeight: '38px',
      minWidth: '180px',
      padding: '0 15px',
      margin: '10px',
      cursor: 'pointer',
      color: 'white',
      backgroundColor: '#1EA6E0',
      border: '#1EA6E0',
      borderRadius: '5px',
      fontSize: '15px',
      textTransform: 'uppercase'
    };
  }

  render() {
    const styles = this.getDefaultStyles();

    return (
      <button
        {...this.props}
        style={styles}
      >
        {this.props.children}
      </button>
    );
  }
}
