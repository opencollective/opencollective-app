import React from 'react';
import moment from 'moment';

import ProfilePhoto from './ProfilePhoto';
import Currency from './Currency';
import TransactionStatus from './TransactionStatus';

export default ({transaction, user}) => (
  <div className='TransactionItem'>
    <ProfilePhoto
      size='75px'
      hasBorder={true}
      url={user && user.avatar} />

    <div className='TransactionItem-info'>
      <div className='TransactionItem-meta'>
        <span className='TransactionItem-created'>
          {transaction.createdAt && moment(transaction.createdAt).fromNow()}
        </span>
        <span className='TransactionItem-status'>
          {transaction.amount < 0 && <TransactionStatus {...transaction} />}
        </span>
      </div>

      <div className='TransactionItem-description'>
        {transaction.description}
      </div>

      <div className='TransactionItem-amount'>
        <Currency value={transaction.amount} currency={transaction.currency} />
      </div>
    </div>
  </div>
);
