import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import values from 'lodash/object/values';
import filter from 'lodash/collection/filter';
import sortByDate from '../lib/sort_by_date';
import getUniqueValues from '../lib/get_unique_values';

import { fetchUser, fetchUserIfNeeded } from '../actions/users';
import { fetchTransactions } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import TransactionList from '../components/TransactionsList';

import Content from './Content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GroupTitle from '../components/GroupTitle';

class GroupTransactions extends Component {
  render() {
    let { group, groupid, transactions, users } = this.props;
    return (
      <div className='GroupTransactions'>
        <Header
          title={group.name}
          hasBackButton={true} />
        <Content>
          <GroupTitle group={group} />
          <div className='padded'>
            <div className='GroupTransactions-title'>Activity Detail</div>
            <TransactionList
              transactions={transactions}
              users={users} />
          </div>
        </Content>
        <Footer groupid={groupid} />
      </div>
    );
  }

  componentDidMount() {
    const {
      fetchGroup,
      fetchTransactions,
      groupid,
      fetchUserIfNeeded
    } = this.props;

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
  fetchUser,
  fetchUserIfNeeded
})(GroupTransactions);

function mapStateToProps(state) {
  const groupid = state.router.params.groupid;
  return {
    groupid,
    group: state.groups[groupid] || {},
    transactions: filter(state.transactions, {GroupId: Number(groupid)}).sort(sortByDate),
    users: state.users || {}
  };
}