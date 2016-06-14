import React from 'react';

import Expense from './Expense';

export default ({expenses=[], users}) => {
  return (
    <div>
      {expenses.map(expense => {
        return (
          <Expense
            key={expense.id}
            {...expense}
            user={users[expense.UserId] || {}} />
        );
      })}
    </div>
  );
}
