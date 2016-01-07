import React from 'react';
import moment from 'moment';
import ProfilePhoto from './ProfilePhoto';

export default ({transaction, user}) => {
  const fullName = user.first_name ? `${user.first_name} ${user.last_name}` : '';
  const date = moment(transaction.createdAt).format('MMMM Do YYYY, h:mm a');

  return (
    <div className='TransactionComment'>
      <div className='TransactionComment-header'>
        <ProfilePhoto url={user.avatar} />
        <div className='TransactionComment-date'>
          {date}
        </div>
        <div className='TransactionComment-fullName'>
          {fullName}
        </div>
      </div>
      <div className='TransactionComment-comment'>
        {transaction.comment}
      </div>
    </div>
  );
};
