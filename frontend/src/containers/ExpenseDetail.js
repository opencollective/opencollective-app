import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import classnames from 'classnames';

import {PENDING,
        APPROVED,
        REJECTED,
        PAID,
        MANUAL } from '../constants/expenses'

import payExpense from '../actions/expenses/pay';
import updateExpense from '../actions/expenses/update';
import approveExpense from '../actions/expenses/approve';
import rejectExpense from '../actions/expenses/reject';
import deleteExpense from '../actions/expenses/delete';
import fetchExpense from '../actions/expenses/fetch_by_id';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import fetchUserGroups from '../actions/users/fetch_groups';
import fetchGroup from '../actions/groups/fetch_by_id';
import appendTransactionForm from '../actions/form/append_transaction';
import fetchUserIfNeeded from '../actions/users/fetch_by_id_cached';

import Content from './Content';

import tags from '../ui/tags';
import payoutMethods from '../ui/payout_methods';

import TopBar from '../components/TopBar';
import EntryDetailComment from '../components/EntryDetailComment';
import ExpenseDetailInfo from '../components/ExpenseDetailInfo';
import EntryDetailTitle from '../components/EntryDetailTitle';
import ReceiptPreview from '../components/ReceiptPreview';
import ProfilePhoto from '../components/ProfilePhoto';

import Notification from '../components/Notification';
import AsyncButton from '../components/AsyncButton';
import ApproveButton from '../components/ApproveButton';
import RejectButton from '../components/RejectButton';
import Select from '../components/Select';
import ExpenseStatus from '../components/ExpenseStatus';

import isHostLib from '../lib/is_host';

class ExpenseDetail extends Component {
  render() {
    const {
      groupid,
      expenseid,
      commenter,

      group,
      expense,
      isLoading,
      showEditButton,
      isManual,
      isApproved,
      showDeleteButton,
      showApprovalButtons,

      approveInProgress,
      rejectInProgress,
      updateInProgress,
      payInProgress,

      updateExpense
    } = this.props;

    const className = classnames({
      ExpenseDetail: true,
      'ExpenseDetail--noImage': !expense.attachment
    });

    return (
      <div className={className}>
        <TopBar
          title={group.name}
          backLink={'/'}
          rightLink={showEditButton && {
            label: 'Edit',
            url: `/groups/${groupid}/expenses/${expenseid}/edit`
          }} />
        <Content isLoading={isLoading}>
          <Notification {...this.props} />

          <EntryDetailTitle text={expense.title} />

          <div className='padded'>

            <div className='ExpenseDetail-user'>
              <ProfilePhoto url={commenter && commenter.avatar} />
              <div className='ExpenseDetail-user-name'>
                {commenter.name}
              </div>
            </div>
            {/* Receipt */}
            {expense.attachment && (
              <div className='ExpenseDetail-image'>
                <ReceiptPreview
                  src={expense.attachment}
                  href={expense.attachment}
                />
              </div>
            )}

            <ExpenseDetailInfo
              {...this.props}
              handleChange={tag => updateExpense(groupid, expenseid, {tags: [tag]})} />

            {expense.notes && (
              <EntryDetailComment entry={expense} commenter={commenter} />
            )}

            <div className='ExpenseDetail-status'>
              {expense && expense.status && <ExpenseStatus {...expense} /> }
            </div>

            {showDeleteButton && (
              <div className='u-mt1'>
                <AsyncButton
                  color='red'
                  onClick={delExpense.bind(this)}>
                  Delete expense
                </AsyncButton>
              </div>

            )}

            {showApprovalButtons && (
              <div>
                <div className='ExpenseDetail-payoutMethod'>
                  <div className='u-bold u-py1'>Payout method</div>
                  <Select
                    disabled={expense.isRejected || expense.isApproved}
                    options={payoutMethods}
                    value={expense.payoutMethod}
                    handleChange={payoutMethod => updateExpense(groupid, expenseid, {payoutMethod})} />
                </div>
                <div className='u-mt2'>
                  <ApproveButton
                    disabled={updateInProgress}
                    isManual={isManual}
                    approved={isApproved}
                    approveExpense={approveAndPay.bind(this)}
                    inProgress={approveInProgress || payInProgress} />
                  <RejectButton
                    disabled={updateInProgress}
                    rejectExpense={reject.bind(this)}
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
      fetchExpense,
      fetchUserGroups,
      fetchGroup,
      fetchUserIfNeeded,
      groupid,
      userid,
      expenseid
    } = this.props;

    if (userid) {
      fetchUserGroups(userid); // User groups to get the role as well
    }

    fetchGroup(groupid);

    fetchExpense(groupid, expenseid)
    .then(() => {
      if (this.props.expense.UserId) { // for the comment section
        fetchUserIfNeeded(this.props.expense.UserId);
      }
    });
  }

  nextPage() {
    this.props.pushState(null, `/`);
  }
}

export function approveAndPay() {
  const {
    approveExpense,
    group,
    expense,
    payExpense,
    notify
  } = this.props;

  approve(approveExpense, group, expense)
  .then(() => payExpense(group.id, expense.id))
  .then(() => notify('success', 'Successfully approved expense'))
  .then(() => this.nextPage())
  .catch(({message}) => notify('error', message));
};

function approve(approveExpense, group, expense) {
  if (expense.status === PENDING) {
    return approveExpense(group.id, expense.id)
  } else {
    return Promise.resolve();
  }
}

export function reject() {
  const { group, expense, rejectExpense, notify } = this.props;

  rejectExpense(group.id, expense.id)
  .then(() => notify('success', 'Successfully rejected expense'))
  .then(() => this.nextPage())
  .catch(({message}) => notify('error', message));
};

export function delExpense() {
  const {
    notify,
    deleteExpense,
    groupid,
    expenseid
  } = this.props;

  return deleteExpense(groupid, expenseid)
    .then(() => notify('success', 'Expense is deleted'))
    .then(() => this.nextPage())
    .catch(({message}) => notify('error', message));
};

export default connect(mapStateToProps, {
  fetchExpense,
  approveExpense,
  rejectExpense,
  fetchUserGroups,
  fetchGroup,
  appendTransactionForm,
  pushState,
  fetchUserIfNeeded,
  payExpense,
  notify,
  resetNotifications,
  deleteExpense,
  updateExpense
})(ExpenseDetail);

export function mapStateToProps({
  router,
  expenses,
  users,
  notification,
  session,
  groups
}) {
  const { expenseid, groupid } = router.params;
  const userid = session.user.id;

  const user = users[userid] || {};
  const group = groups[groupid] || {};
  const expense = expenses[expenseid] || {};

  const isPending = expense.status === PENDING;
  const isApproved = expense.status === APPROVED;
  const isRejected = expense.status === REJECTED;
  const isPaid = expense.status === PAID;
  const isManual = expense.payoutMethod === MANUAL;

  const userGroups = user.groups || {};
  const isHost = isHostLib([userGroups[groupid]]) ;

  return {
    groupid,
    expenseid,
    userid,
    user,

    group,
    expense,
    notification,
    tags: tags(groupid),
    commenter: users[expense.UserId] || {},

    isHost,
    isLoading: !expense.id,
    isManual,
    showEditButton: isPending,

    isPaid,
    isRejected,
    isApproved,
    showDeleteButton: isHost && isRejected,
    showApprovalButtons: isHost && !isPaid && !isRejected,
    approveInProgress: expenses.approveInProgress,
    payInProgress: expenses.payInProgress,
    rejectInProgress: expenses.rejectInProgress,
    updateInProgress: expenses.updateInProgress
  };
}
