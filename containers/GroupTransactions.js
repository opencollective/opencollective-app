import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'lodash/object/values';
import Transaction from '../components/Transaction';

class GroupTransactions extends Component {
  render() {
    const { groups, transactions, groupid } = this.props;
    const group = groups[groupid] || {};
    const transactionsNode = values(transactions).map(transaction => {
      return <li key={transaction.id}><Transaction {...transaction} /></li>
    });
    return (
      <div>
        <div className="border-bottom px2 py2 bold">
          {group.name} <span className="right"> {group.budgetLeft} / {group.budget}</span>
        </div>
        <ul className="list-reset">{transactionsNode}</ul>
      </div>
    );
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad('1');
  }
}

export default GroupTransactions;
