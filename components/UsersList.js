import React from 'react';

import ProfilePhoto from './ProfilePhoto';
import Currency from './Currency';

export default ({users=[], size, equalSpace=false}) => {
  let style = {};

  if (equalSpace) {
    const width = users.length ? (100 / users.length) : 0;
    style = {
      width: `calc(${width}% - 1rem)`
    };
  }

  return (
    <div className='UsersList'>
      {users.map(user => {
        return (
          <div className='UsersList-item' style={style}>
            <ProfilePhoto
              key={user.id}
              url={user.avatar}
              size={size} />
              <div className='UsersList-name'>
                {user.name}
              </div>
            </div>
          );
      })}
    </div>
  );
}
