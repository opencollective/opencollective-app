import React from 'react';
import moment from 'moment';
import ProfilePhoto from './ProfilePhoto';

export default ({entry, commenter}) => {
  const date = moment(entry.createdAt).format('MMMM Do YYYY, h:mm a');

  return (
    <div className='EntryComment'>
      <ProfilePhoto url={commenter.avatar} />
      <div className='EntryComment-content'>
        <div className='EntryComment-date'>
          {date}
        </div>
        <div className='EntryComment-fullName'>
          {commenter.name}
        </div>
        <div className='EntryComment-comment'>
          {entry.comment}
        </div>
      </div>
    </div>
  );
};
