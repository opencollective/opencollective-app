import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import classnames from 'classnames';

import payTransaction from '../actions/transactions/pay';
import updateTransaction from '../actions/transactions/update';
import approveTransaction from '../actions/transactions/approve';
import rejectTransaction from '../actions/transactions/reject';
import deleteTransaction from '../actions/transactions/delete';
import fetchTransaction from '../actions/transactions/fetch_by_id';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import fetchUserGroups from '../actions/users/fetch_groups';
import fetchGroup from '../actions/groups/fetch_by_id';
import appendTransactionForm from '../actions/form/append_transaction';
import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';

import Content from './Content';

import tags from '../ui/tags';
import paymentMethods from '../ui/payment_methods';

import TopBar from '../components/TopBar';
import TransactionDetailComment from '../components/TransactionDetailComment';
import TransactionDetailInfo from '../components/TransactionDetailInfo';
import TransactionDetailTitle from '../components/TransactionDetailTitle';
import ReceiptPreview from '../components/ReceiptPreview';

import Notification from '../components/Notification';
import AsyncButton from '../components/AsyncButton';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import Select from '../components/Select';
import TransactionStatus from '../components/TransactionStatus';

import isHost from '../lib/is_host';

class TransactionDetail extends Component {
  render() {
    const {
      groupid,
      transactionid,

      group,
      transaction,
      isPublic,
      isLoading,
      showEditButton,
      isManual,
      showDeleteButton,
      showApprovalButtons,

      approveInProgress,
      rejectInProgress,
      updateInProgress,
      payInProgress,

      updateTransaction
    } = this.props;

    const className = classnames({
      TransactionDetail: true,
      'TransactionDetail--noImage': !transaction.link
    });

    return (
      <div className={className}>
        <TopBar
          title={group.name}
          backLink={`${isPublic ? '/public' : ''}/groups/${groupid}/transactions/`}
          rightLink={showEditButton && {
            label: 'Edit',
            url: `/groups/${groupid}/transactions/${transactionid}/edit`
          }} />
        <Content isLoading={isLoading}>
          <Notification {...this.props} />

          <TransactionDetailTitle {...transaction} />

          <div className='padded'>

            {/* Receipt */}
            {transaction.link && (
              <div className='TransactionDetail-image'>
                <ReceiptPreview
                  src={transaction.link}
                  href={transaction.link}
                />
              </div>
            )}

            <TransactionDetailInfo
              {...this.props}
              handleChange={tag => updateTransaction(groupid, transactionid, {tags: [tag]})} />

            {transaction.comment && (
              <TransactionDetailComment {...this.props} />
            )}

            <div className='TransactionDetail-status'>
              <TransactionStatus {...transaction} />
            </div>

            {showDeleteButton && (
              <div className='u-mt1'>
                <AsyncButton
                  color='red'
                  onClick={deleteExpense.bind(this)}>
                  Delete expense
                </AsyncButton>
              </div>

            )}

            {showApprovalButtons && (
              <div>
                <div className='TransactionDetail-paymentMethod'>
                  <div className='u-bold u-py1'>Payment method</div>
                  <Select
                    disabled={!!transaction.reimbursedAt}
                    options={paymentMethods}
                    value={transaction.paymentMethod}
                    handleChange={paymentMethod => updateTransaction(groupid, transactionid, {paymentMethod})} />
                </div>
                <div className='u-mt2'>
                  <ApproveButton
                    disabled={updateInProgress}
                    isManual={isManual}
                    approved={transaction.approved}
                    approveTransaction={approve.bind(this)}
                    inProgress={approveInProgress || payInProgress} />
                  <RejectButton
                    disabled={updateInProgress}
                    rejectTransaction={reject.bind(this)}
                    inProgress={rejectInProgress} />
                </div>
              </div>
            )}
          </div>
        </Content>
      </div>
    );
  }

  componentDidMount() {
    const {
      fetchTransaction,
      fetchUserGroups,
      fetchGroup,
      fetchUserIfNeeded,
      groupid,
      userid,
      transactionid
    } = this.props;

    if (userid) {
      fetchUserGroups(userid); // User groups to get the role as well
    }

    fetchGroup(groupid);

    fetchTransaction(groupid, transactionid)
    .then(() => {
      if (this.props.transaction.UserId) { // for the comment section
        fetchUserIfNeeded(this.props.transaction.UserId);
      }
    });
  }

  nextPage() {
    this.props.pushState(null, `/groups/${this.props.groupid}/transactions`);
  }
}

export function approve() {
  const {
    group,
    transaction,
    approveTransaction,
    payTransaction,
    notify
  } = this.props;

  approveTransaction(group.id, transaction.id)
  .then(() => payTransaction(group.id, transaction.id))
  .then(() => notify('success', 'Successfully approved transaction'))
  .then(() => this.nextPage())
  .catch(({message}) => notify('error', message));
};

export function reject() {
  const { group, transaction, rejectTransaction, notify } = this.props;

  rejectTransaction(group.id, transaction.id)
  .then(() => notify('success', 'Successfully rejected transaction'))
  .then(() => this.nextPage())
  .catch(({message}) => notify('error', message));
};

export function deleteExpense() {
  const {
    notify,
    deleteTransaction,
    groupid,
    transactionid
  } = this.props;

  return deleteTransaction(groupid, transactionid)
    .then(() => notify('success', 'Expense is deleted'))
    .then(() => this.nextPage())
    .catch(({message}) => notify('error', message));
};

export default connect(mapStateToProps, {
  fetchTransaction,
  approveTransaction,
  rejectTransaction,
  fetchUserGroups,
  fetchGroup,
  appendTransactionForm,
  pushState,
  fetchUserIfNeeded,
  payTransaction,
  notify,
  resetNotifications,
  deleteTransaction,
  updateTransaction
})(TransactionDetail);

export function mapStateToProps({
  router,
  transactions,
  users,
  notification,
  session,
  groups
}) {
  const { transactionid, groupid } = router.params;
  const userid = session.user.id;

  const user = users[userid] || {};
  const group = groups[groupid] || {};
  const transaction = transactions[transactionid] || {};
  const {
    isExpense,
    isDonation,
    isManual,
    isRejected,
    isReimbursed
  } = transaction;

  const userGroups = user.groups || {};
  const userIsHost = isHost([userGroups[groupid]]) ;

  return {
    groupid,
    transactionid,
    userid,

    group,
    transaction,
    notification,
    tags: tags(groupid),
    commenter: users[transaction.UserId] || {},

    isHost: userIsHost,
    isLoading: !transaction.id,
    isDonation,
    isExpense,
    isManual,
    showEditButton: !transaction.approvedAt && isExpense,

    isReimbursed,
    isRejected,
    showDeleteButton: isExpense && isRejected && userIsHost,
    showApprovalButtons: !isReimbursed && !isRejected && isHost && isExpense,
    approveInProgress: transactions.approveInProgress,
    payInProgress: transactions.payInProgress,
    rejectInProgress: transactions.rejectInProgress,
    updateInProgress: transaction.updateInProgress
  };
}
