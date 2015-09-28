import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GroupTransactions from './GroupTransactions';
import { fetchGroup, fetchTransactions } from '../actions';

class App extends Component {
  render() {
    const { dispatch, groups, transactions } = this.props;
    const group = groups[0];
    const loadGroupTransactionsData = (groupid) => {
      dispatch(fetchGroup(groupid))
      dispatch(fetchTransactions(groupid))
    };

    return (
      <div>
        <Header title='Application' />
        <GroupTransactions group={group} transactions={transactions} onLoad={loadGroupTransactionsData}/>
      </div>
    );
  }
}

export default connect(function(store) {
  return {
    groups: store.groups,
    transactions: store.transactions
  }
})(App);


