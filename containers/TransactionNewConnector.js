import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransactionNew from './TransactionNew';
import { createTransaction } from '../actions/transactions';

class TransactionNewConnector extends Component {
  render() {
    const {routeParams} = this.props;
    const {groupid} = routeParams;

    return (
      <TransactionNew {...this.props} groupid={groupid} />
    );
  }
}

export default connect((store) => {
  return {
    groups: store.groups,
    transactions: store.transactions,
  };
}, (dispatch) => {
  return bindActionCreators({createTransaction}, dispatch);
})(TransactionNewConnector);
