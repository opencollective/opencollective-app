import React, { Component, PropTypes } from 'react';

const Avatar = ({url, size}) => {
  const style = {
    width: size || '55px',
    height: size || '55px'
  };

  return <img
      src={url || 'http://api.randomuser.me/portraits/women/39.jpg'}
      className='Avatar'
      style={style} />;
}

Avatar.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string
};

export default Avatar;
