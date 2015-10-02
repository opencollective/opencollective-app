import React, { Component } from 'react';
import values from 'lodash/object/values';
import filter from 'lodash/collection/filter';
import Header from '../components/Header';
import Group from '../components/Group';

class GroupsList extends Component {

  render() {
    const { groups, transactions } = this.props;
    const groupsNode = values(groups).map((group) => {
      const groupTransactions = filter(transactions, {GroupId: group.id});
      return <Group {...group} transactions ={groupTransactions} key={group.id} />;
    });

    return (
      <div>
        <Header title='My Groups' />
        {groupsNode}
      </div>
    );
  }

  componentDidMount() {
    const { fetchUserGroupsAndTransactions, user } = this.props;
    if (user && user.id) {
      fetchUserGroupsAndTransactions(user.id);
    }
  }
}

export default GroupsList;
