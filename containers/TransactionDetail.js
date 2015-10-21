import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  payTransaction
} from '../actions/transactions';
import { fetchGroup } from '../actions/groups';
import { appendTransactionForm } from '../actions/form';
import { fetchUserIfNeeded } from '../actions/users';
import Content from './Content';
import Header from '../components/Header';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import TransactionDetailTitle from '../components/TransactionDetailTitle';
import TransactionDetailComment from '../components/TransactionDetailComment';
import TransactionDetailInfo from '../components/TransactionDetailInfo';
import TransactionDetailApproval from '../components/TransactionDetailApproval';

class TransactionDetail extends Component {
  render() {
    const {
      group,
      transaction
    } = this.props;

    return (
      <div>
        <Header title={group.name} hasBackButton={true} />
        <Content>
          <TransactionDetailTitle
            description={transaction.description} />

          <div className='TransactionDetail'>
            <div className='TransactionDetail-image'>
              <img src={transaction.link} />
            </div>
            <TransactionDetailInfo
              {...this.props}
              handleChange={this.handleTag.bind(this)} />
            <TransactionDetailComment {...this.props} />
            <TransactionDetailApproval
              {...this.props}
              approveTransaction={this.approveTransaction.bind(this)}
              rejectTransaction={this.rejectTransaction.bind(this)} />
          </div>
        </Content>
      </div>
    );
  }

  componentDidMount() {
    const {
      fetchTransaction,
      fetchGroup,
      groupid,
      transactionid
    } = this.props;

    fetchGroup(groupid);

    fetchTransaction(groupid, transactionid)
    .then(() => this.fetchUser.bind(this));
  }

  fetchUser() {
    const { fetchUserIfNeeded, transaction } = this.props;

    if (transaction.UserId) {
      fetchUserIfNeeded(transaction.UserId);
    }
  }

  handleTag(value) {
    this.props.appendTransactionForm({
      tags: [value]
    });
  }

  approveTransaction() {
    const {
      group,
      transaction,
      approveTransaction,
      payTransaction
    } = this.props;

    approveTransaction(group.id, transaction.id)
    .then(() => payTransaction(group.id, transaction.id))
    .then(() => this.nextPage());
  }

  rejectTransaction() {
    const { group, transaction, rejectTransaction } = this.props;

    rejectTransaction(group.id, transaction.id)
    .then(() => this.nextPage())
  }

  nextPage() {
    const { group, pushState } = this.props;

    pushState(null, `/groups/${group.id}/transactions`)
  }
}

export default connect(mapStateToProps, {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  fetchGroup,
  appendTransactionForm,
  pushState,
  fetchUserIfNeeded,
  payTransaction
})(TransactionDetail);

function mapStateToProps(state) {
  const { transactionid, groupid } = state.router.params;
  const {
    approveInProgress,
    rejectInProgress,
    payInProgress
  } = state.transactions;
  const transaction = state.transactions[transactionid] || {};

  return {
    groupid,
    transactionid,
    group: state.groups[groupid] || {},
    transaction,
    tags: state.form.transaction.defaults.tags,
    user: state.users[transaction.UserId] || {},
    approveInProgress: approveInProgress || payInProgress,
    rejectInProgress: state.transactions.rejectInProgress
  };
}
