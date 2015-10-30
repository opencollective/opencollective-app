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
import nestTransactionsInGroups from '../lib/nest_transactions_in_groups';
import getUniqueValues from '../lib/get_unique_values';
import isViewerOnly from '../lib/is_viewer_only';
import isAdmin from '../lib/is_admin';

class GroupsList extends Component {
  render() {
    const { users, groups, isLoading } = this.props;

    return (
      <div>
        <Header title={this.title(this.props)} hasBackButton={false} />
        <Content isLoading={isLoading}>
          {this.paypalReminder(this.props)}
          {groups.map(group => {
            return <Group
              {...group}
              users={users}
              key={group.id} />
          })}
        </Content>
      </div>
    );
  }

  title({groups=[]}) {
    if (groups.length === 1) {
      return groups[0].name;
    } else {
      return 'My Groups';
    }
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

  paypalReminder({getApprovalKeyForUser, inProgress, query, userid, showPaypalReminder}) {
    if (showPaypalReminder) {
      return <PaypalReminder
        getApprovalKey={getApprovalKeyForUser.bind(this, userid)}
        inProgress={inProgress}
        approvalStatus={query.approvalStatus} />;
    }
  }
}

export default connect(mapStateToProps, {
  fetchUserGroupsAndTransactions,
  fetchUserIfNeeded,
  getApprovalKeyForUser,
  confirmApprovalKey
})(GroupsList);

function mapStateToProps({users, session, router}) {
  // Logged in user
  const userid = session.user.id;
  const currentUser = users[userid] || {};
  const { groups, transactions } = currentUser;

  return {
    groups: nestTransactionsInGroups(groups, transactions),
    userid,
    users: users,
    transactions,
    inProgress: users.inProgress,
    query: router.location.query,
    isLoading: !groups,
    showPaypalReminder: isAdmin(values(groups))
  };
}
