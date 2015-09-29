import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupTransactions from './GroupTransactions';
import { fetchGroup, fetchTransactions } from '../actions';

class GroupTransactionsConnector extends Component {
  render() {
    const {dispatch, routeParams} = this.props;
    const groupid = routeParams.groupid;
    const loadGroupTransactionsData = () => {
      dispatch(fetchGroup(groupid))
      dispatch(fetchTransactions(groupid))
    };
    return (
      <GroupTransactions {...this.props} groupid={groupid} onLoad={loadGroupTransactionsData}/>
    );
  }
}

export default connect(function(store) {
  return {
    groups: store.groups,
    transactions: store.transactions,
  }
})(GroupTransactionsConnector);
