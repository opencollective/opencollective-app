import React from 'react';
import Avatar from './Avatar';

export default ({transaction, user}) => {
  const fullName = user.first_name ? `${user.first_name} ${user.last_name}` : '';
  return (
    <div className='TransactionComment'>
      <div className='TransactionComment-header'>
        <Avatar url={user.avatar} />
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
