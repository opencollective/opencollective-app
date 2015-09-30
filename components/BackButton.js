import React, { Component } from 'react';

class BackButton extends Component {
  render() {
    return (
      <span onClick={this.handleClick}>
        Back
      </span>
    );
  }

  handleClick() {
    window.history.back();
  }
}

export default BackButton;
