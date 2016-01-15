import React, { PropTypes } from 'react';
import BackButton from './BackButton';
import GroupSettingsButton from './GroupSettingsButton';

const TopBar = ({hasBackButton, title, backLink, groupSettingsLink}) => {
  return (
    <div className='TopBar'>
      <span className='TopBar-backButton'>
        {hasBackButton || backLink ? <BackButton backLink={backLink}/> : null}
      </span>
      <div className='TopBar-title'>{title}</div>
      <span className='TopBar-groupSettingsButton'>
        {groupSettingsLink ? <GroupSettingsButton groupSettingsLink={groupSettingsLink}/> : null }
      </span>
    </div>
  );
}

TopBar.propTypes = {
  hasBackButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backLink: PropTypes.string
};

TopBar.defaultProps = {
  hasBackButton: false,
  title: ''
};

export default TopBar;

