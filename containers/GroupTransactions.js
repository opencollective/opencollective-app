import React, { Component } from 'react';
import { connect } from 'react-redux';

import values from 'lodash/object/values';
import filter from 'lodash/collection/filter';
import sortByDate from '../lib/sort_by_date';
import getUniqueValues from '../lib/get_unique_values';

import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';
import fetchTransactions from '../actions/transactions/fetch_by_group';
import fetchGroups from '../actions/users/fetch_groups';
import isAdmin from '../lib/is_admin';
import showPopOverMenu from '../actions/session/show_popovermenu';

import Content from './Content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransactionList from '../components/TransactionsList';
import GroupTitle from '../components/GroupTitle';
import EmptyList from '../components/EmptyList';

class GroupTransactions extends Component {
  render() {
    const {
      group,
      groupid,
      isLoading,
      hasPopOverMenuOpen,
      showPopOverMenu,
      userIsAdmin
    } = this.props;

    return (
      <div className='GroupTransactions'>
        <Header
          title={group.name}
          backLink='/' />
        <Content
          isLoading={isLoading}
          hasPopOverMenuOpen={hasPopOverMenuOpen} >
          <GroupTitle group={group} />
          <div className='padded'>
            <div className='GroupTransactions-title'>Activity Detail</div>
            {this.list(this.props)}
          </div>
        </Content>
        <Footer {...this.props} />
     </div>
    );
  }

  list({transactions, users}) {
    if (transactions.length > 0) {
      return <TransactionList transactions={transactions} users={users} />
    } else {
      return <EmptyList />;
    }
  }

  componentDidMount() {
    const {
      fetchGroups,
      fetchTransactions,
      groupid,
      userid,
      fetchUserIfNeeded,
      showPopOverMenu
    } = this.props;

    showPopOverMenu(false);
    fetchGroups(userid);
    fetchTransactions(groupid)
    .then(({transactions}) => {
      return getUniqueValues(transactions, 'UserId').map(fetchUserIfNeeded);
    });
  }
}

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchGroups,
  fetchUserIfNeeded,
  showPopOverMenu
})(GroupTransactions);

function mapStateToProps({transactions, router, users={}, session}) {
  const groupid = router.params.groupid;
  const userid = session.user.id;
  const user = users[userid] || {};
  const userGroups = user.groups || {};
  const group = userGroups[groupid] || {};
  const transactionsArray = values(transactions);
  const userIsAdmin = isAdmin([userGroups[groupid]]);
  
  return {
    groupid,
    group,
    transactions: filter(transactionsArray, {GroupId: Number(groupid)}).sort(sortByDate),
    userid,
    users: users,
    isLoading: !group.id,
    hasPopOverMenuOpen: session.hasPopOverMenuOpen,
    userIsAdmin
  };
}
