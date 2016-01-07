import React, { PropTypes } from 'react';

const ProfilePhoto = ({backgroundUrl, size, foregroundUrl, spinner}) => {

  const defaultSize = '55px';

  if (backgroundUrl) {
    var backgroundImage = backgroundUrl;
  } else {
    var backgroundImage = '/images/default_avatar.svg';
  }

  const outerDivStyle = {
    width: size || defaultSize,
    height: size || defaultSize,
  }

  const divStyle = {
    width: size || defaultSize,
    height: size || defaultSize,
    backgroundImage: 'url(' + backgroundImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'absolute',
  };

  const imgStyle = {
    width: defaultSize,
    height: defaultSize,
    position: 'relative',
    margin: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
  };

  if (foregroundUrl || spinner) {
    var cssClass = 'ProfilePhoto blur-on';
  }
  else {
    var cssClass = 'ProfilePhoto'
  }

  return (
    <div className='ProfilePhoto' style={outerDivStyle}>
      <div className={cssClass} style={divStyle} />
      {foregroundUrl ? <img src={foregroundUrl} style={imgStyle} /> : null }
      {spinner ? <div className='spinner-loader center-element'/> : null }
    </div>
    );
}

ProfilePhoto.propTypes = {
  backgroundUrl: PropTypes.string,
  size: PropTypes.string,
  foregroundUrl: PropTypes.string,
  spinner: PropTypes.string
};

export default ProfilePhoto;
