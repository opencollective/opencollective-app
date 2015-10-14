import React from 'react';
import moment from 'moment';

export default (transaction) => {
  const date = transaction.createdAt ? moment(transaction.createdAt).fromNow() : '';
  return (
    <div className='Well'>
      <div className='Well-secondary'>
        {date}
      </div>
      <div className='Well-primary'>
        {transaction.description}
      </div>
    </div>
  );
};
