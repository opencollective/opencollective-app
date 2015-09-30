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
    const rightButtonNode = rightButton ? <HeaderRightButton {...rightButton} /> : undefined;

    return (
      <div className='clearfix mb2 black bg-white border-bottom'>
        <div className='left'>
          <div className='btn py2 m0'>
            {backButton}
          </div>
        </div>
        <div className='right'>
          <div className='btn py2 m0'>
            {rightButtonNode}
          </div>
        </div>
        <div className='center'>
          <div className='btn py2 m0'>
            {title}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
