import React from 'react';
import Icon from './Icon';
import TransactionItem from './TransactionItem';

export default ({expenses, users}) => {
  if (expenses.length === 0) {
    return (
      <div className='PublicGroup-emptyState'>
        <div className='PublicGroup-expenseIcon'>
          <Icon type='expense' />
        </div>
        <label>
          All your approved expenses will show up here
        </label>
      </div>
    );
  }

  return (
    <div>
    {expenses.map(expense => <TransactionItem key={expense.id}
                    transaction={expense}
                    user={users[expense.UserId]} />)}
    </div>
  );
}