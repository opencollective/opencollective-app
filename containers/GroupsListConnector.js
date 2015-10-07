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

class GroupsListConnector extends Component {
  render() {
    const { groups, transactions } = this.props;
    const groupsNode = values(groups).map((group) => {
      const groupTransactions = filter(transactions, {GroupId: group.id});
      return <Group {...group} transactions ={groupTransactions} key={group.id} />;
    });

    return (
      <div>
        <Header title='Accounting' hasBackButton={false} />
        <Content> {groupsNode} </Content>
        <Footer />
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
})(GroupsListConnector);

function mapStateToProps(state) {
  return {
    groups: state.users.groups,
    transactions: state.users.transactions,
    user: state.users.info,
  };
}
