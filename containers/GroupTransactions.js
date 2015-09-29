import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'lodash/object/values';
import { fetchGroup } from '../actions';
import Transaction from '../components/Transaction';

class GroupTransactions extends Component {
  render() {
    const { groups, transactions, groupid } = this.props;
    const name = groups[groupid] ? groups[groupid].name : '';
    const transactionsNode = values(transactions).map(transaction => {
      return <li key={transaction.id}><Transaction {...transaction} /></li>
    });
    return (
      <div>
        GroupTransactions <br/>
        {name}
        <ul>{transactionsNode}</ul>
      </div>
    );
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad('1');
  }
}

export default GroupTransactions;
