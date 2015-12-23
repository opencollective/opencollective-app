import React, { PropTypes } from 'react';

const Avatar = ({url, size}) => {

  if (url) {
    var backgroundImage = url;
  } else {
    var backgroundImage = '/images/default_avatar.svg';
  }

  const style = {
    width: size || '55px',
    height: size || '55px',
    backgroundImage: 'url(' + backgroundImage + ')',
    backgroundSize: size || '55px',
  };

  return <div className='Avatar' style={style} />;

}

Avatar.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string
};

export default Avatar;
