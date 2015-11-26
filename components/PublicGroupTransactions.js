import React from 'react';

import Transaction from './Transaction';

export default ({transaction, user}) => {
  return (
    <div className='PublicGroupTransactions'>
      <div className='PublicGroupTransactions-title'>
        Latest transactions
      </div>
      <div>
        <Transaction
          {...transaction}
          user={user} />
      </div>
    </div>
  );
};
