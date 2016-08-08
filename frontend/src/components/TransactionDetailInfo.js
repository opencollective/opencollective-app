import React from 'react';

import Currency from './Currency';

export default ({transaction, tags}) => {

  const vatInput = function() {
    if (!transaction.vat) return;

    return (
      <div className="TransactionDetail-vat">
        Including&nbsp;
        <Currency value={transaction.vat} currency={transaction.currency} /> VAT
      </div>
    )
  }

  return (
    <div className='TransactionDetail-info'>
      <div className='TransactionDetail-price'>
        <Currency value={transaction.amount} currency={transaction.currency} />
      </div>
      {vatInput()}
      <div className='TransactionDetail-category'>
        {transaction.tags ? transaction.tags[0] : tags[0]}
      </div>
    </div>
  );
};
