import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import pick from 'lodash/object/pick';

import fetchGroup from '../actions/groups/fetch_by_id';
import createTransaction from '../actions/transactions/create';
import resetTransactionForm from '../actions/form/reset_transaction';
import appendTransactionForm from '../actions/form/append_transaction';
import validateTransaction from '../actions/form/validate_transaction';
import fetchTransaction from '../actions/transactions/fetch_by_id';
import updateTransaction from '../actions/transactions/update';
import uploadImage from '../actions/images/upload';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';

import tags from '../ui/tags';
import vats from '../ui/vat';

import Content from './Content';

import TransactionForm from '../components/TransactionForm';
import TopBar from '../components/TopBar';
import SubmitButton from '../components/SubmitButton';

export class TransactionEdit extends Component {

  render() {
    return (
      <div>
        <TopBar
          title='Edit Expense'
          backLink={`/groups/${this.props.groupid}/transactions/`} />
        <Content>
          <TransactionForm
            {...this.props}
            handleSubmit={update.bind(this)}>
            <SubmitButton color='green'>
              Save
            </SubmitButton>
          </TransactionForm>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    const {
      groupid,
      transactionid,
      fetchGroup,
      fetchTransaction,
      appendTransactionForm
    } = this.props;

    fetchGroup(groupid);
    fetchTransaction(groupid, transactionid)
    .then(() => {
      const transaction = this.props.initialTransaction;

      // Let's invert to show a positive expense value to the user
      return appendTransactionForm({
       ...transaction,
        amount: -transaction.amount
      });
    });
  }
};

export function update({attributes}) {
  const {
    updateTransaction,
    notify,
    pushState,
    groupid,
    transactionid,
    validateTransaction
  } = this.props;

  const transaction = pick(attributes, [
    'link',
    'description',
    'amount',
    'vat',
    'createdAt',
    'approvedAt',
    'tags',
    'approved',
    'payoutMethod',
    'comment'
  ]);

  // reinvert to save negative value in db
  transaction.amount = -transaction.amount;

  validateTransaction(transaction)
  .then(() => updateTransaction(groupid, transactionid, transaction))
  .then(() => notify('success', 'Updated the expense'))
  .then(() => pushState(null, `/groups/${groupid}/transactions`))
  .catch(({message}) => notify('error', message));
};

export default connect(mapStateToProps, {
  createTransaction,
  uploadImage,
  resetTransactionForm,
  appendTransactionForm,
  validateTransaction,
  pushState,
  notify,
  fetchGroup,
  resetNotifications,
  fetchTransaction,
  updateTransaction
})(TransactionEdit);

function mapStateToProps({router, form, notification, images, groups, transactions}) {
  const transaction = form.transaction;
  const groupid = router.params.groupid;
  const transactionid = router.params.transactionid;

  return {
    groupid,
    transactionid,
    initialTransaction: transactions[transactionid] || {},
    group: groups[groupid] || {},
    notification,
    transaction,
    tags: tags(groupid),
    enableVAT: vats(groupid),
    isUploading: images.isUploading || false
  };
}
