import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import filter from 'lodash/collection/filter';
import { fetchTransactions } from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import TransactionList from '../components/TransactionsList';
import Header from '../components/Header';
import GroupTitle from '../components/GroupTitle';
import GroupTransactions from './GroupTransactions';
import Content from './Content';

class GroupTransactionsConnector extends Component {
  render() {
    const { routeParams, groups, transactions } = this.props;
    const groupid = routeParams.groupid;

    const groupTransactions = filter(transactions, {GroupId: Number(groupid)});
    const group = groups[groupid] || {};

    return (
      <div className='GroupTransactions'>
        <Header title={group.name} hasBackButton={false} />
        <Content>
          <GroupTitle group={group} />
          <div className='GroupTransactions-list'>
            <div className='GroupTransactions-title'>Activity Detail</div>
            <TransactionList transactions={groupTransactions} groupid={groupid} />
          </div>
        </Content>
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
})(GroupTransactionsConnector);

function mapStateToProps(state) {
  return {
    groups: state.groups,
    transactions: state.transactions,
  };
}
