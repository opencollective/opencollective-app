import React, { Component } from 'react';
import { connect } from 'react-redux';

import sortByDate from '../lib/sort_by_date';
import getUniqueValues from '../lib/get_unique_values';
import filterCollection from '../lib/filter_collection';

import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';
import fetchTransactions from '../actions/transactions/fetch_by_group';
import fetchGroup from '../actions/groups/fetch_by_id';
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
      showPopOverMenu
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
        <Footer
          groupid={groupid}
          hasPopOverMenuOpen={hasPopOverMenuOpen}
          showPopOverMenu={showPopOverMenu} />
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
      fetchGroup,
      fetchTransactions,
      groupid,
      fetchUserIfNeeded,
      showPopOverMenu
    } = this.props;

    showPopOverMenu(false);
    fetchGroup(groupid);
    fetchTransactions(groupid)
    .then(({transactions}) => {
      return getUniqueValues(transactions, 'UserId').map(fetchUserIfNeeded);
    });
  }
}

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchGroup,
  fetchUserIfNeeded,
  showPopOverMenu
})(GroupTransactions);

function mapStateToProps({transactions, router, groups, users={}, session}) {
  const groupid = router.params.groupid;
  const group = groups[groupid] || {};
  const GroupId = Number(groupid);

  return {
    groupid,
    group,
    transactions: filterCollection(transactions, { GroupId }).sort(sortByDate),
    users,
    isLoading: !group.id,
    hasPopOverMenuOpen: session.hasPopOverMenuOpen
  };
}
