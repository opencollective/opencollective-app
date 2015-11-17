import React from 'react';
import BackButton from './BackButton';

const Header = ({hasBackButton, title}) => {
  return (
    <div className='Header'>
      <span className='Header-backButton'>
        {hasBackButton ? <BackButton /> : undefined}
      </span>
      <div className='Header-title'>{title}</div>
    </div>
  );
}

Header.propTypes = {
  hasBackButton: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired
};

Header.defaultProps = {
  hasBackButton: false,
  title: ''
};

export default Header;

