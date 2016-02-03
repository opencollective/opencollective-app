import React, { Component } from 'react';
import { connect } from 'react-redux';

import sortByDate from '../lib/sort_by_date';
import getUniqueValues from '../lib/get_unique_values';
import filterCollection from '../lib/filter_collection';
import isHost from '../lib/is_host';

import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';
import fetchTransactions from '../actions/transactions/fetch_by_group';
import fetchGroup from '../actions/groups/fetch_by_id';
import fetchGroups from '../actions/users/fetch_groups';
import showPopOverMenu from '../actions/session/show_popovermenu';

import Content from './Content';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import TransactionsList from '../components/TransactionsList';
import ExportTransactionsButton from '../components/ExportTransactionsButton';
import GroupTitle from '../components/GroupTitle';
import EmptyList from '../components/EmptyList';

class GroupTransactions extends Component {
  render() {
    const {
      group,
      groupid,
      isLoading,
      hasPopOverMenuOpen,
      showPopOverMenu
    } = this.props;

    const url = `/app/groups/${groupid}/settings/`;

    return (
      <div className='GroupTransactions'>
        <TopBar
          title={group.name}
          backLink='/app/'
          groupSettingsLink={url} />
        <Content
          isLoading={isLoading}
          hasPopOverMenuOpen={hasPopOverMenuOpen} >
          <GroupTitle group={group} />
          <div className='padded'>
            <div className='GroupTransactions-title'>
              <span>Activity Detail</span>
              <ExportTransactionsButton {...this.props} />
            </div>
            {this.list(this.props)}
          </div>
        </Content>
        <Footer
          {...this.props}
          groupid={groupid}
          hasPopOverMenuOpen={hasPopOverMenuOpen}
          showPopOverMenu={showPopOverMenu}/>
     </div>
    );
  }

  list({transactions, users}) {
    if (transactions.length > 0) {
      return <TransactionsList transactions={transactions} users={users} />
    } else {
      return <EmptyList />;
    }
  }

  componentDidMount() {
    const {
      fetchGroup,
      fetchGroups,
      fetchTransactions,
      userid,
      groupid,
      fetchUserIfNeeded,
      showPopOverMenu
    } = this.props;

    showPopOverMenu(false);
    fetchGroup(groupid);
    fetchGroups(userid);
    fetchTransactions(groupid)
    .then(({transactions}) => {
      return getUniqueValues(transactions, 'UserId').map(fetchUserIfNeeded);
    });
  }
}

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchGroup,
  fetchGroups,
  fetchUserIfNeeded,
  showPopOverMenu
})(GroupTransactions);

export function mapStateToProps({transactions, router, groups, users={}, session}) {
  const groupid = router.params.groupid;
  const group = groups[groupid] || {};
  const GroupId = Number(groupid);
  const userid = session.user.id

  const userGroup = users && users[userid] && users[userid].groups && users[userid].groups[GroupId]

  return {
    userid,
    groupid,
    group,
    transactions: filterCollection(transactions, { GroupId }).sort(sortByDate),
    isHost:  isHost([userGroup]),
    users,
    isLoading: !group.id,
    hasPopOverMenuOpen: session.hasPopOverMenuOpen
  };
}
