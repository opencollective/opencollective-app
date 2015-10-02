import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GroupsList from './GroupsList';
import { fetchUserGroupsAndTransactions } from '../actions/users';
import { fetchTransactions } from '../actions/transactions';

class GroupsListConnector extends Component {
  render() {
    return (
      <GroupsList {...this.props}/>
    );
  }
}

export default connect((store) => {
  return {
    groups: store.users.groups,
    transactions: store.users.transactions,
    user: store.users.info
  };
}, (dispatch) => {
  return bindActionCreators({fetchUserGroupsAndTransactions}, dispatch);
})(GroupsListConnector);
