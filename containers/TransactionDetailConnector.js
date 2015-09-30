import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransactionDetail from './TransactionDetail';
import { fetchTransaction, approveTransaction, rejectTransaction } from '../actions/transactions';

class TransactionDetailConnector extends Component {
  render() {
    const {dispatch, routeParams} = this.props;
    const {groupid, transactionid} = routeParams;

    return (
      <TransactionDetail {...this.props} groupid={groupid} transactionid={transactionid}/>
    );
  }
}

export default connect((store) => {
  return {
    groups: store.groups,
    transactions: store.transactions,
  };
}, (dispatch) => {
  return bindActionCreators({
    fetchTransaction,
    approveTransaction,
    rejectTransaction,
  }, dispatch);
})(TransactionDetailConnector);
