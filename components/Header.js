import React, { Component } from 'react';
import BackButton from './BackButton';
import HeaderRightButton from './HeaderRightButton';

class Header extends Component {
  propTypes: {
    hasBackButton: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired
  }

  render() {
    const {title, hasBackButton, rightButton} = this.props;
    const backButton = hasBackButton ? <BackButton /> : undefined;

    return (
      <div className='Header'>
        <span className='Header-backButton'>
          {backButton}
        </span>
        <div className='Header-title'>{title}</div>
      </div>
    );
  }
}

export default Header;
