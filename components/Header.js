import React, { PropTypes } from 'react';
import BackButton from './BackButton';

const Header = ({hasBackButton, title, backLink}) => {
  return (
    <div className='Header'>
      <span className='Header-backButton'>
        {hasBackButton || backLink ? <BackButton backLink={backLink}/> : null}
      </span>
      <div className='Header-title'>{title}</div>
    </div>
  );
}

Header.propTypes = {
  hasBackButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backLink: PropTypes.string
};

Header.defaultProps = {
  hasBackButton: false,
  title: ''
};

export default Header;

