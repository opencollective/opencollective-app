import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'lodash/object/values';
import Transaction from '../components/Transaction';
import TransactionList from '../components/TransactionsList';
import Header from '../components/Header';
import GroupTitle from '../components/GroupTitle';
import { fetchTransactions } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';

class GroupTransactions extends Component {
  render() {
    const { groups, transactions, groupid } = this.props;
    const group = groups[groupid] || {};
    const rightButton = {
      url: `groups/${groupid}/transactions/new`,
      text: 'New'
    };

    return (
      <div>
        <Header title='Transactions' hasBackButton={false} rightButton={rightButton}/>
        <GroupTitle group={group} />
        <TransactionList transactions={transactions} groupid={groupid} />
      </div>
    );
  }

  componentDidMount() {
    const { fetchGroup, fetchTransactions } = this.props;
    fetchGroup(groupid);
    fetchTransactions(groupid);
  }
}

export default GroupTransactions;

