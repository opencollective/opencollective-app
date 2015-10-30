import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  payTransaction
} from '../actions/transactions';
import { fetchUserGroups } from '../actions/users';
import { appendTransactionForm } from '../actions/form';
import { fetchUserIfNeeded } from '../actions/users';
import Content from './Content';
import Header from '../components/Header';
import TransactionDetailTitle from '../components/TransactionDetailTitle';
import TransactionDetailComment from '../components/TransactionDetailComment';
import TransactionDetailInfo from '../components/TransactionDetailInfo';
import TransactionDetailApproval from '../components/TransactionDetailApproval';
import isAdmin from '../lib/is_admin';

class TransactionDetail extends Component {
  render() {
    const { group, transaction, isLoading } = this.props;

    return (
      <div>
        <Header title={group.name} hasBackButton={true} />
        <Content isLoading={isLoading}>
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
            {this.approvalButtons(this.props)}
          </div>
        </Content>
      </div>
    );
  }

  componentDidMount() {
    const {
      fetchTransaction,
      fetchUserGroups,
      groupid,
      userid,
      transactionid
    } = this.props;

    fetchUserGroups(userid); // User groups to get the role as well

    fetchTransaction(groupid, transactionid)
    .then(() => this.fetchTransactionUser.bind(this));
  }

  approvalButtons({showApprovalButtons}) {
    if (showApprovalButtons) {
      return <TransactionDetailApproval
        {...this.props}
        approveTransaction={this.approveTransaction.bind(this)}
        rejectTransaction={this.rejectTransaction.bind(this)} />
    }
  }

  fetchTransactionUser() {
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
  fetchUserGroups,
  appendTransactionForm,
  pushState,
  fetchUserIfNeeded,
  payTransaction
})(TransactionDetail);

function mapStateToProps({
  router,
  transactions,
  users,
  form,
  session
}) {
  const { transactionid, groupid } = router.params;
  const currentUserId = session.user.id;
  const currentUser = users[currentUserId] || {};
  const groups = currentUser.groups || {};
  const group = groups[groupid] || {};
  const { approveInProgress, rejectInProgress, payInProgress } = transactions;
  const transaction = transactions[transactionid] || {};

  return {
    userid: currentUserId,
    groupid,
    transactionid,
    group,
    transaction,
    tags: form.transaction.defaults.tags,
    user: users[transaction.UserId] || {},
    approveInProgress: approveInProgress || payInProgress,
    rejectInProgress,
    isLoading: !transaction.id,
    showApprovalButtons: isAdmin([group])
  };
}
