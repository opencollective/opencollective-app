import React from 'react';

import Icon from './Icon';

export default ({type, url}) => {

  const link = {
    twitter: `https://twitter.com/home?status=${url}`,
    facebook: `https://facebook.com/sharer.php?u=${url}`,
    mail: `mailto:?body=${url}`,
  };

  return (
    <span
      onClick={() => window.open(link[type])}
      className='ShareIcon'>
      <Icon type={type} />
    </span>
  )
};