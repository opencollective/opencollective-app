import React, { Component, PropTypes } from 'react';
import values from 'lodash/object/values';
import Transaction from './Transaction';
import EmptyList from './EmptyList';

export default ({transactions, users}) => {
  const transactionsArray = values(transactions);

  if (transactionsArray.length > 0) {
    return (
      <div>
        {transactionsArray.map(transaction => {
          return <Transaction
            key={transaction.id}
            {...transaction}
            user={users[transaction.UserId] || {}} />;
        })}
      </div>
    );
  } else {
    return <EmptyList />;
  }
}
