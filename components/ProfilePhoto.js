import React, { PropTypes } from 'react';

const ProfilePhoto = ({url, size, spinner, hasBorder=false}) => {

  const defaultSize = '55px';

  if (url) {
    var backgroundImage = url;
  } else {
    var backgroundImage = '/images/default_avatar.svg';
  }

  const border = hasBorder ? {
    border: '3px solid white',
    boxShadow: '0px 0px 0px 1px #7FADF2'
  } : {};

  const divStyle = {
    ...border,
    width: size || defaultSize,
    height: size || defaultSize,
    backgroundImage: 'url(' + backgroundImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (

    <div className='ProfilePhoto' style={divStyle}>
      {spinner ? <div className='spinner-loader center-element'/> : null }
    </div>
  );
}

ProfilePhoto.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string,
  spinner: PropTypes.string
};

export default ProfilePhoto;
