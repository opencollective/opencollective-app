import React from 'react';

import Currency from './Currency';

export default ({expense}) => {

  const vatInput = function() {
    if (!expense.vat) return;

    return (
      <div className="ExpenseDetail-vat">
        Including&nbsp;
        <Currency value={expense.vat} currency={expense.currency} precision={2} /> VAT
      </div>
    )
  }

  return (
    <div className='ExpenseDetail-info'>
      <div className='ExpenseDetail-price'>
        <Currency value={expense.amount} currency={expense.currency} precision={2} />
      </div>
      {vatInput()}
      <div className='ExpenseDetail-category'>
        {expense.category}
      </div>
    </div>
  );
};
