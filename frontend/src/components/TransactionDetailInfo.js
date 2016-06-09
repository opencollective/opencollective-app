import React from 'react';

import Currency from './Currency';
import SelectTag from './SelectTag';

export default ({transaction, tags, handleChange, isDonation, isPublic, isRejected}) => {

  var vatInput = function() {
    if (!transaction.vat) return;

    return (
      <div className="TransactionDetail-vat">
        Including&nbsp;
        <Currency value={transaction.vat} currency={transaction.currency} /> VAT
      </div>
    )
  }

  function getAmount(amount) {
    return isDonation ? amount : (amount/100).toFixed(2);
  }

  return (
    <div className='TransactionDetail-info'>
      <div className='TransactionDetail-price'>
        <Currency value={getAmount(transaction.amount)} currency={transaction.currency} />
      </div>
      {vatInput()}
      <div className='TransactionDetail-category'>
        Category
        <SelectTag
          disabled={isDonation || isPublic || isRejected}
          tags={tags}
          attributes={transaction}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};
