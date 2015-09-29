import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GroupTransactions from './GroupTransactions';

class App extends Component {
  render() {
    const { dispatch, groups, transactions } = this.props;
    const group = groups[0];
    return (
      <div>
        <Header title='Application' />
        <ul>
          <li>Links</li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/groups/2/transactions">Group 1 transactions</Link></li>
          <li><Link to="/groups/2/transactions/1">Group 1 transaction 1</Link></li>
          <li><Link to="/groups/2/transactions/new">Group 1 new transaction</Link></li>
        </ul>
        {this.props.children}
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


