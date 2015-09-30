import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GroupsList from './GroupsList';
import { fetchGroupsFromUser } from '../actions/groups';

class GroupsListConnector extends Component {
  render() {
    return (
      <GroupsList {...this.props}/>
    );
  }
}

export default connect((store) => {
  return {
    groups: store.groups,
    transactions: store.transactions,
  };
}, (dispatch) => {
  return bindActionCreators({fetchGroupsFromUser}, dispatch);
})(GroupsListConnector);
