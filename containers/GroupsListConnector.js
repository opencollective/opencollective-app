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
  var userid = '1';
  return {
    groups: store.users[userid] ? store.users[userid].groups : {},
    transactions: store.users[userid] ? store.users[userid].transactions : {},
  };
}, (dispatch) => {
  return bindActionCreators({fetchUserGroupsAndTransactions}, dispatch);
})(GroupsListConnector);
