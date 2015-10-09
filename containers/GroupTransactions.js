import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import filter from 'lodash/collection/filter';
import sortByDate from '../lib/sort_by_date';
import { fetchTransactions } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import TransactionList from '../components/TransactionsList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GroupTitle from '../components/GroupTitle';
import Content from './Content';

class GroupTransactions extends Component {
  render() {
    let { group, groupid, transactions, routeParams } = this.props;
    groupid = groupid || routeParams.groupid; // when transitioning, router.params is empty
    return (
      <div className='GroupTransactions'>
        <Header title={group.name} hasBackButton={true} />
        <Content>
          <GroupTitle group={group} />
          <div className='padded'>
            <div className='GroupTransactions-title'>Activity Detail</div>
            <TransactionList transactions={transactions} />
          </div>
        </Content>
        <Footer groupid={groupid} />
      </div>
    );
  }

  componentDidMount() {
    const { fetchGroup, fetchTransactions, routeParams } = this.props;
    fetchGroup(routeParams.groupid);
    fetchTransactions(routeParams.groupid);
  }
}

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchGroup,
})(GroupTransactions);

function mapStateToProps(state) {
  const groupid = state.router.params.groupid;
  return {
    groupid,
    group: state.groups[groupid] || {},
    transactions: filter(state.transactions, {GroupId: groupid}).sort(sortByDate),
    transactions: state.transactions,
  };
}
