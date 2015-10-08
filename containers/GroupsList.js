import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'lodash/object/values';
import filter from 'lodash/collection/filter';
import { fetchUserGroupsAndTransactions } from '../actions/users';
import { fetchTransactions } from '../actions/transactions';
import Content from './Content';
import Header from '../components/Header';
import Group from '../components/Group';
import Footer from '../components/Footer';

class GroupsList extends Component {
  render() {
    const { groups, transactions } = this.props;
    const groupsNode = values(groups).map((group) => {
      const groupTransactions = filter(transactions, {GroupId: group.id})
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

      return <Group {...group} transactions ={groupTransactions} key={group.id} />;
    });

    return (
      <div>
        <Header title='Accounting' hasBackButton={false} />
        <Content> {groupsNode} </Content>
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

export default connect(mapStateToProps, {
  fetchUserGroupsAndTransactions
})(GroupsList);

function mapStateToProps(state) {
  return {
    groups: state.users.groups,
    transactions: state.users.transactions,
    user: state.users.info,
  };
}
