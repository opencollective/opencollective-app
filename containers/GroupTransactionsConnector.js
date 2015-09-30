import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GroupTransactions from './GroupTransactions';
import { fetchTransactions } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';

class GroupTransactionsConnector extends Component {
  render() {
    const { routeParams } = this.props;
    const groupid = routeParams.groupid;

    return (
      <GroupTransactions {...this.props} groupid={groupid} />
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
    fetchTransactions,
    fetchGroup,
  }, dispatch);
})(GroupTransactionsConnector);
