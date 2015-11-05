import React from 'react';
import Avatar from '../components/Avatar';

export default ({avatar, name}) => {
  return  (
    <div className='Profile-header'>
      <Avatar url={avatar} size='110px' />
      <div className='Profile-name'>
        {name}
      </div>
    </div>
  );
};
