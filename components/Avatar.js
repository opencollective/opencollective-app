import React, { PropTypes } from 'react';

const Avatar = ({url, size}) => {
  const style = {
    width: size || '55px',
    height: size || '55px'
  };

  if (url) {
    return <img src={url} className='Avatar' style={style} />;
  } else {
    return (
      <img
      src='/images/default_avatar.svg'
      className='Avatar'
      style={style} />
    );
  }
}

Avatar.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string
};

export default Avatar;
