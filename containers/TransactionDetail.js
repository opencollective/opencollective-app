import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import rejectError from '../lib/reject_error';

import payTransaction from '../actions/transactions/pay';
import approveTransaction from '../actions/transactions/approve';
import rejectTransaction from '../actions/transactions/reject';
import fetchTransaction from '../actions/transactions/fetch_by_id';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import fetchUserGroups from '../actions/users/fetch_groups';
import appendTransactionForm from '../actions/form/append_transaction';
import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';

import Content from './Content';

import Header from '../components/Header';
import TransactionDetailTitle from '../components/TransactionDetailTitle';
import TransactionDetailComment from '../components/TransactionDetailComment';
import TransactionDetailInfo from '../components/TransactionDetailInfo';
import TransactionDetailApproval from '../components/TransactionDetailApproval';
import Notification from '../components/Notification';

import isAdmin from '../lib/is_admin';
import isDonation from '../lib/is_donation';

class TransactionDetail extends Component {
  render() {
    const {
      group,
      transaction,
      isLoading,
      groupid
    } = this.props;

    return (
      <div>
        <Header
          title={group.name}
          backLink={`/groups/${groupid}/transactions/`} />
        <Content isLoading={isLoading}>
          <Notification {...this.props} />
          <TransactionDetailTitle {...transaction} />
          <div className='TransactionDetail'>
            <div className='TransactionDetail-image'>
              <Link to={transaction.link}>
                <img src={transaction.link} />
              </Link>
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
      return (
        <TransactionDetailApproval
          {...this.props}
          approveTransaction={approveAndPay.bind(this)}
          rejectTransaction={reject.bind(this)} />
      );
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


  nextPage() {
    const { group, pushState } = this.props;

    pushState(null, `/groups/${group.id}/transactions`)
  }
}

export function approveAndPay() {
  const {
    group,
    transaction,
    approveTransaction,
    payTransaction,
    notify
  } = this.props;

  approveTransaction(group.id, transaction.id)
  .then(rejectError)
  .then(() => payTransaction(group.id, transaction.id))
  .then(rejectError)
  .then(() => this.nextPage())
  .catch(({message}) => notify('error', message));
};

export function reject() {
  const { group, transaction, rejectTransaction } = this.props;

  rejectTransaction(group.id, transaction.id)
  .then(rejectError)
  .then(() => this.nextPage());
};

export default connect(mapStateToProps, {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  fetchUserGroups,
  appendTransactionForm,
  pushState,
  fetchUserIfNeeded,
  payTransaction,
  notify,
  resetNotifications
})(TransactionDetail);

function mapStateToProps({
  router,
  transactions,
  users,
  form,
  notification,
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
    notification,
    tags: form.transaction.defaults.tags,
    user: users[transaction.UserId] || {},
    approveInProgress: approveInProgress || payInProgress,
    rejectInProgress,
    isLoading: !transaction.id,
    showApprovalButtons: isAdmin([group]) && !isDonation(transaction),
    isDonation: isDonation(transaction)
  };
}
