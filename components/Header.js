import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import BackButton from './BackButton';

class Header extends Component {
  propTypes: {
    hasBackButton: PropTypes.bool,
    title: PropTypes.string.isRequired
  }

  defaultProps: {
    hasBackButton: false,
    title: ''
  }

  render() {
    const { hasBackButton, title } = this.props;

    return (
      <div className='Header'>
        <span className='Header-backButton'>
          {hasBackButton ? <BackButton /> : undefined}
        </span>
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
