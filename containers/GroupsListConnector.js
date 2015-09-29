import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupsList from './GroupsList';
import { fetchGroupsFromUser } from '../actions/groups';

class GroupsListConnector extends Component {
  render() {
    const {dispatch} = this.props;
    const loadGroup = () => dispatch(fetchGroupsFromUser('1'));
    return (
      <GroupsList {...this.props} onLoad={loadGroup}/>
    );
  }
}

export default connect(function(store) {
  return {
    groups: store.groups,
    transactions: store.transactions,
  }
})(GroupsListConnector);
