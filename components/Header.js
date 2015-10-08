import React, { Component, PropTypes } from 'react';
import BackButton from './BackButton';

class Header extends Component {
  propTypes: {
    hasBackButton: PropTypes.bool,
    title: PropTypes.string.isRequired
  }

  defaultProps: {
    hasBackButton: false,
    title: 'OpenCollective'
  }

  render() {
    const { hasBackButton, title } = this.props;
    const backButton = hasBackButton ? <BackButton /> : undefined;

    return (
      <div className='Header'>
        <span className='Header-backButton'>{backButton}</span>
        <div className='Header-title'>{title}</div>
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  hasBackButton: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired
};

Header.defaultProps = {
  hasBackButton: false,
  title: 'OpenCollective'
};
