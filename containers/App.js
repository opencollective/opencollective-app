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
        {this.props.children}
      </div>
    );
  }
}

export default connect(function(store) {
  return {
    groups: store.groups,
    transactions: store.transactions,
  };
})(App);
