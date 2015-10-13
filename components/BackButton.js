import React, { Component } from 'react';
import Icon from './Icon';

class BackButton extends Component {
  render() {
    return (
      <span className='BackButton' onClick={this.handleClick}>
        <Icon type='left' />
      </span>
    );
  }

  handleClick() {
    window.history.back();
  }
}

export default BackButton;
