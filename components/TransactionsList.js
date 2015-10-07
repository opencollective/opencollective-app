import React, { Component } from 'react';
import { Link } from 'react-router';
import values from 'lodash/object/values';
import Transaction from './Transaction';

class TransactionList extends Component {
  render() {
    const {transactions, groupid} = this.props;
    const transactionsArray = values(transactions);

    return (
      <div>
        {transactionsArray.map(transaction => {
          return <Transaction {...transaction} groupid={groupid} key={transaction.id} />;
        })}
      </div>
    );
  }
}

export default TransactionList;
