import React from 'react';
import Currency from './Currency';

export default ({group}) => {
  return (
    <div className='Well'>
      <span className='Well-primary'>
        Current balance
      </span>
      <span className='Well-right'>
        <Currency value={group.balance} />
      </span>
    </div>
  );
};
