import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import { createTransaction } from '../actions/transactions';
import {
  resetTransactionForm,
  appendTransactionForm,
  validateTransaction
} from '../actions/form';
import { uploadImage } from '../actions/images';
import { notify } from '../actions/notification';
import Content from './Content';
import TransactionForm from '../components/TransactionForm';
import Header from '../components/Header';

class TransactionNew extends Component {
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

    this.createTransaction(transaction)
    .then(() => pushState(null, `/groups/${groupid}/transactions`))
    .catch(error => notify('error', error.message));
  }

  createTransaction(transaction) {
    const {
      groupid,
      createTransaction
    } = this.props;

    return createTransaction(groupid, transaction)
    .then(() => {
      const error = this.props.requestError;
      return error ? Promise.reject(error) : Promise.resolve(transaction);
    });
  }
}

export default connect(mapStateToProps, {
  createTransaction,
  uploadImage,
  resetTransactionForm,
  appendTransactionForm,
  validateTransaction,
  pushState,
  notify
})(TransactionNew);

function mapStateToProps(state) {
  return {
    groupid: state.router.params.groupid,
    transaction: state.form.transaction,
    tags: state.form.transaction.defaults.tags,
    validationError: state.form.transaction.error,
    requestError: state.transactions.error,
    notification: state.notification
  };
}
