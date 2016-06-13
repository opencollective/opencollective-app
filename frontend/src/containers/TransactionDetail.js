import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import classnames from 'classnames';

import updateTransaction from '../actions/transactions/update';
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

import TopBar from '../components/TopBar';
import EntryDetailComment from '../components/EntryDetailComment';
import TransactionDetailInfo from '../components/TransactionDetailInfo';
import EntryDetailTitle from '../components/EntryDetailTitle';
import ReceiptPreview from '../components/ReceiptPreview';
import ProfilePhoto from '../components/ProfilePhoto';

import Notification from '../components/Notification';
import AsyncButton from '../components/AsyncButton';

import isHost from '../lib/is_host';

class TransactionDetail extends Component {
  render() {
    const {
      groupid,
      transactionid,
      commenter,

      group,
      transaction,
      isLoading,
      showDeleteButton,

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
          backLink={`/groups/${groupid}/transactions/`}
         />
        <Content isLoading={isLoading}>
          <Notification {...this.props} />

          <EntryDetailTitle text={transaction.description} />

          <div className='padded'>

            <div className='TransactionDetail-user'>
              <ProfilePhoto url={commenter && commenter.avatar} />
              <div className='TransactionDetail-user-name'>
                {commenter.name}
              </div>
            </div>
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
              <EntryDetailComment entry={transaction} commenter={commenter} />
            )}

            {showDeleteButton && (
              <div className='u-mt1'>
                <AsyncButton
                  color='red'
                  onClick={deleteExpense.bind(this)}>
                  Delete expense
                </AsyncButton>
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
  fetchUserGroups,
  fetchGroup,
  appendTransactionForm,
  pushState,
  fetchUserIfNeeded,
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
    user,

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
