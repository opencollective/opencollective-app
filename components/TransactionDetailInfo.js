import React from 'react';

import Currency from './Currency';
import SelectTag from './SelectTag';

export default ({transaction, tags, handleChange, isDonation}) => {
  return (
    <div className='TransactionDetail-info'>
      <div className='TransactionDetail-price'>
        <Currency value={transaction.amount} currency={transaction.currency} />
      </div>

      <div className='TransactionDetail-category'>
        Category
        <SelectTag
          disabled={isDonation}
          tags={tags}
          attributes={transaction}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};




