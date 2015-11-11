import React, { Component, PropTypes } from 'react';
import Transaction from './Transaction';

export default ({transactions, users}) => {
  return (
    <div>
      {transactions.map(transaction => {
        return <Transaction
          key={transaction.id}
          {...transaction}
          user={users[transaction.UserId] || {}} />;
      })}
    </div>
  );
}
