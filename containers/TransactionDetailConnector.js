import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionDetail from './TransactionDetail';
import { fetchTransaction, approveTransaction, rejectTransaction } from '../actions/transactions';

class TransactionDetailConnector extends Component {
  render() {
    const {dispatch, routeParams} = this.props;
    const {groupid, transactionid} = routeParams;

    const loadTransaction = () => dispatch(fetchTransaction(groupid, transactionid));
    const sendApproveTransaction = () => dispatch(approveTransaction(groupid, transactionid));
    const sendRejectTransaction = () => dispatch(rejectTransaction(groupid, transactionid));
    const actions = {loadTransaction, sendApproveTransaction, sendRejectTransaction};

    return (
      <TransactionDetail {...this.props} groupid={groupid} transactionid={transactionid} actions={actions}/>
    );
  }
}

export default connect(function(store) {
  return {
    groups: store.groups,
    transactions: store.transactions,
  };
})(TransactionDetailConnector);
