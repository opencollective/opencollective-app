import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import values from 'lodash/object/values';
import Transaction from './Transaction';

class TransactionList extends Component {
  propTypes: {
    groupid: PropTypes.string.isRequired
  }

  render() {
    const {transactions, groupid} = this.props;

    return (
      <div>
        {values(transactions).map(transaction => {
          return <Transaction {...transaction} groupid={groupid} key={transaction.id} />;
        })}
      </div>
    );
  }
}

export default TransactionList;
