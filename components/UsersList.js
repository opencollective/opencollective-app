import React from 'react';

import ProfilePhoto from './ProfilePhoto';

export default ({users=[]}) => {

  const profileImageName = (avatar, name) => {
    return (
      <div>
        <ProfilePhoto url={avatar} hasBorder={true} />
        <div className='UsersList-name'>{name}</div>
      </div>
    );
  };

  return (
    <div className='UsersList'>
      {users.map(({id, avatar, name, website, twitterHandle}) => {
        const href = website || 'https://twitter.com/' + twitterHandle;
        return (
            <div className='UsersList-item' key={id}>
              {href ? <a href={href} title={name}>{profileImageName(avatar,name)}</a> : profileImageName(avatar,name) }
            </div>
        );
      })}
    </div>
  );
};