import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import createTransaction from '../actions/transactions/create';
import resetTransactionForm from '../actions/form/reset_transaction';
import appendTransactionForm from '../actions/form/append_transaction';
import validateTransaction from '../actions/form/validate_transaction';
import uploadImage from '../actions/images/upload';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';

import Content from './Content';

import TransactionForm from '../components/TransactionForm';
import Header from '../components/Header';

export class TransactionNew extends Component {
  render() {
    return (
      <div>
        <Header title='Submit Expense' hasBackButton={true} />
        <Content>
          <TransactionForm
            {...this.props}
            handleSubmit={this.handleSubmit.bind(this)} />
        </Content>
      </div>
    );
  }

  handleSubmit(transaction) {
    const { notify, groupid, pushState } = this.props;

    return createExpense.call(this, transaction)
    .then(() => pushState(null, `/groups/${groupid}/transactions`))
    .catch(error => notify('error', error.message));
  }
};

/**
 * Export methods for testing
 */

export function createExpense(transaction) {
  const {
    groupid,
    createTransaction
  } = this.props;

  // An expense is a negative transaction in the backend
  return createTransaction(groupid, {...transaction, amount: -transaction.amount })
  .then(() => {
    const error = this.props.requestError;
    return error ? Promise.reject(error) : Promise.resolve(transaction);
  });
}

export default connect(mapStateToProps, {
  createTransaction,
  uploadImage,
  resetTransactionForm,
  appendTransactionForm,
  validateTransaction,
  pushState,
  notify,
  resetNotifications
})(TransactionNew);

function mapStateToProps(state) {
  return {
    groupid: state.router.params.groupid,
    transaction: state.form.transaction,
    tags: state.form.transaction.defaults.tags,
    validationError: state.form.transaction.error.message,
    requestError: state.transactions.error,
    notification: state.notification,
    isUploading: state.images.isUploading || false
  };
}
