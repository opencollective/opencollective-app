import React from 'react';

import Avatar from './Avatar';
import Currency from './Currency';

export default ({users=[], size}) => {
  return (
    <div className='UsersList'>
      {users.map(user => {
        return (
          <div className='UsersList-item'>
            <Avatar
              key={user.id}
              url={user.avatar}
              size={size} />
              <div className='UsersList-name'>
                {user.name}
              </div>
              { user.amount ?
                <div className='UsersList-amount'><Currency value={user.amount}/></div> :
                null
              }
            </div>
          );
      })}
    </div>
  );
}
