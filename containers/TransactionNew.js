import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import fetchGroup from '../actions/groups/fetch_by_id';
import createTransaction from '../actions/transactions/create';
import resetTransactionForm from '../actions/form/reset_transaction';
import appendTransactionForm from '../actions/form/append_transaction';
import validateTransaction from '../actions/form/validate_transaction';
import uploadImage from '../actions/images/upload';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';

import tags from '../ui/tags';
import vats from '../ui/vat';

import Content from './Content';

import TransactionForm from '../components/TransactionForm';
import TopBar from '../components/TopBar';

export class TransactionNew extends Component {
  render() {
    return (
      <div>
        <TopBar
          title='Submit Expense'
          backLink={`/groups/${this.props.groupid}/transactions/`} />
        <Content>
          <TransactionForm
            {...this.props}
            handleSubmit={createExpense.bind(this)} />
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.groupid);
  }
};

export function createExpense() {
  const {
    notify,
    groupid,
    pushState,
    createTransaction,
    group,
    validateTransaction,
    transaction
  } = this.props;
  const attributes = transaction.attributes;

  return validateTransaction(attributes)
  .then(() => {
    const newTransaction = {
      ...attributes,
      amount: -attributes.amount,
      currency: group.currency
    };

    return createTransaction(group.id, newTransaction);
  })
  .then(() => pushState(null, `/groups/${groupid}/transactions`))
  .catch(error => notify('error', error.message));
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
  resetNotifications
})(TransactionNew);

function mapStateToProps({router, form, notification, images, groups}) {
  const transaction = form.transaction;
  const groupid = router.params.groupid;

  return {
    groupid,
    group: groups[groupid] || {},
    notification,
    transaction,
    tags: tags(groupid),
    enableVAT: vats(groupid),
    isUploading: images.isUploading || false
  };
}
