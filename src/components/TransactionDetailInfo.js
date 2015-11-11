import React from 'react';
import Currency from '../components/Currency';
import SelectTag from '../components/SelectTag';

export default ({transaction, tags, handleChange}) => {
  return (
    <div className='TransactionDetail-info'>
      <div className='TransactionDetail-price'>
        <Currency value={transaction.amount} />
      </div>

      <div className='TransactionDetail-category'>
        Category
        <SelectTag
          tags={tags}
          attributes={transaction}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};




