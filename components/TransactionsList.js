import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import values from 'lodash/object/values';
import Transaction from './Transaction';

class TransactionList extends Component {
  propTypes: {
    groupid: PropTypes.string.isRequired
  }

  render() {
    const { transactions, users } = this.props;
    return (
      <div>
        {values(transactions).map(transaction => {
          return <Transaction
            key={transaction.id}
            {...transaction}
            user={users[transaction.UserId] || {}}
            />;
        })}
      </div>
    );
  }
}

export default TransactionList;
