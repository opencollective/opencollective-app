import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'lodash/object/values';
import extend from 'lodash/object/extend';
import filter from 'lodash/collection/filter';

import fetchUserGroupsAndTransactions from '../actions/users/fetch_groups_and_transactions';
import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';
import getPreapprovalKeyForUser from '../actions/users/get_preapproval_key';
import confirmPreapprovalKey from '../actions/users/confirm_preapproval_key';
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
        <Header title='My collectives' hasBackButton={false} />
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

  componentDidMount() {
    const {
      fetchUserGroupsAndTransactions,
      userid,
      fetchUserIfNeeded,
      confirmPreapprovalKey,
      query
    } = this.props;

    if (userid) {
      fetchUserGroupsAndTransactions(userid)
      .then(({transactions}) => {
        return getUniqueValues(transactions, 'UserId').map(fetchUserIfNeeded);
      });
    }

    if (query.preapprovalKey && query.approvalStatus === 'success') {
      confirmPreapprovalKey(userid, query.preapprovalKey);
    }
  }

  paypalReminder({getPreapprovalKeyForUser, inProgress, query, userid, showPaypalReminder}) {
    if (showPaypalReminder) {
      return <PaypalReminder
        getPreapprovalKey={getPreapprovalKeyForUser.bind(this, userid)}
        inProgress={inProgress}
        approvalStatus={query.approvalStatus} />;
    }
  }
}

export default connect(mapStateToProps, {
  fetchUserGroupsAndTransactions,
  fetchUserIfNeeded,
  getPreapprovalKeyForUser,
  confirmPreapprovalKey
})(GroupsList);

function mapStateToProps({users, session, router}) {
  // Logged in user
  const userid = session.user.id;
  const currentUser = users[userid] || {};
  const { groups, transactions } = currentUser;
  const query = router.location.query;

  return {
    groups: nestTransactionsInGroups(groups, transactions),
    userid,
    users: users,
    transactions,
    inProgress: users.inProgress,
    query,
    isLoading: !groups,
    showPaypalReminder: isAdmin(values(groups)) && query.paypalreminder
  };
}
