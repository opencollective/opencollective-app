import React, { PropTypes } from 'react';
import BackButton from './BackButton';
import GroupSettingsButton from './GroupSettingsButton';

const Header = ({hasBackButton, title, backLink, groupSettingsLink}) => {
  return (
    <div className='Header'>
      <span className='Header-backButton'>
        {hasBackButton || backLink ? <BackButton backLink={backLink}/> : null}
      </span>
      <div className='Header-title'>{title}</div>
      <span className='Header-groupSettingsButton'>
        {groupSettingsLink ? <GroupSettingsButton groupSettingsLink={groupSettingsLink}/> : null }
      </span>
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

