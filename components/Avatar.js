import React, { Component, PropTypes } from 'react';

const Avatar = ({url}) => {
  return <img src={url || 'http://api.randomuser.me/portraits/women/39.jpg'} className='Avatar' />;
}

Avatar.propTypes = {
  url: PropTypes.string
};

export default Avatar;
