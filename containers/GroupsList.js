import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'lodash/object/values';
import extend from 'lodash/object/extend';
import filter from 'lodash/collection/filter';
import {
  fetchUserGroupsAndTransactions,
  fetchUserIfNeeded,
  getApprovalKeyForUser,
  confirmApprovalKey
} from '../actions/users';
import { fetchTransactions } from '../actions/transactions';
import Content from './Content';
import Header from '../components/Header';
import Group from '../components/Group';
import Footer from '../components/Footer';
import PaypalReminder from '../components/PaypalReminder';
import sortByDate from '../lib/sort_by_date';
import getUniqueValues from '../lib/get_unique_values';

class GroupsList extends Component {
  render() {
    const { getApprovalKeyForUser, userid, query } = this.props;

    return (
      <div>
        <Header title='Accounting' hasBackButton={false} />
        <Content isLoading={this.props.isLoading}>
        <PaypalReminder
          getApprovalKey={getApprovalKeyForUser.bind(this, userid)}
          inProgress={this.props.inProgress}
          approvalStatus={query.approvalStatus} />
        {this.props.groups.map(group => {
          return <Group
            {...group}
            users={this.props.users}
            transactions={group.transactions}
            key={group.id} />
        })}
        </Content>
      </div>
    );
  }

  componentDidMount() {
    const {
      fetchUserGroupsAndTransactions,
      userid,
      fetchUserIfNeeded,
      confirmApprovalKey,
      query
    } = this.props;

    if (userid) {
      fetchUserGroupsAndTransactions(userid)
      .then(({transactions}) => {
        return getUniqueValues(transactions, 'UserId').map(fetchUserIfNeeded);
      });
    }

    if (query.preapprovalKey && query.approvalStatus === 'success') {
      confirmApprovalKey(userid, query.preapprovalKey);
    }
  }
}

export default connect(mapStateToProps, {
  fetchUserGroupsAndTransactions,
  fetchUserIfNeeded,
  getApprovalKeyForUser,
  confirmApprovalKey
})(GroupsList);

function mapStateToProps(state) {
  // Logged in user
  const userid = state.session.user.id;
  const currentUser = state.users[userid] || {};
  const transactions = values(currentUser.transactions);
  const isLoading = !currentUser.groups;

  const groups = values(currentUser.groups).map((group) => {
    return extend(group, {
      transactions: filter(transactions, { GroupId: group.id }).sort(sortByDate)
    });
  });


  return {
    groups,
    userid,
    users: state.users,
    transactions,
    inProgress: state.users.inProgress,
    query: state.router.location.query,
    isLoading
  };
}
