import React from 'react';

import ProfilePhoto from './ProfilePhoto';

export default ({users=[]}) => (
  <div className='UsersList'>
    {users.map(({id, avatar, name}) => {
      return (
        <div className='UsersList-item' key={id}>
          <ProfilePhoto
            url={avatar}
            hasBorder={true} />
          <div className='UsersList-name'>{name}</div>
        </div>
      );
    })}
  </div>
);
