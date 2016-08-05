import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import pick from 'lodash/object/pick';

import fetchGroup from '../actions/groups/fetch_by_id';
import createExpense from '../actions/expenses/create';
import resetExpenseForm from '../actions/form/reset_expense';
import appendExpenseForm from '../actions/form/append_expense';
import validateExpense from '../actions/form/validate_expense';
import fetchExpense from '../actions/expenses/fetch_by_id';
import updateExpense from '../actions/expenses/update';
import uploadImage from '../actions/images/upload';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';

import tags from '../ui/tags';
import vats from '../ui/vat';

import Content from './Content';

import ExpenseForm from '../components/ExpenseForm';
import TopBar from '../components/TopBar';
import SubmitButton from '../components/SubmitButton';

export class ExpenseEdit extends Component {

  render() {
    return (
      <div>
        <TopBar
          title='Edit Expense'
          backLink={`/groups/${this.props.groupid}/expenses/`} />
        <Content>
          <ExpenseForm
            {...this.props}
            handleSubmit={update.bind(this)}>
            <SubmitButton color='green'>
              Save
            </SubmitButton>
          </ExpenseForm>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    const {
      groupid,
      expenseid,
      fetchGroup,
      fetchExpense,
      appendExpenseForm
    } = this.props;

    fetchGroup(groupid);
    fetchExpense(groupid, expenseid)
    .then(() => appendExpenseForm(this.props.initialExpense));
  }
};

export function update({attributes}) {
  const {
    updateExpense,
    notify,
    pushState,
    groupid,
    expenseid,
    validateExpense
  } = this.props;
  attributes = {
    ...attributes,
    amount: Math.round(100 * attributes.amountText)
  };

  const expense = pick(attributes, [
    'attachment',
    'title',
    'amount',
    'vat',
    'incurredAt',
    'category',
    'payoutMethod',
    'notes'
  ]);

  validateExpense(expense)
  .then(() => updateExpense(groupid, expenseid, expense))
  .then(() => notify('success', 'Updated the expense'))
  .then(() => pushState(null, `/groups/${groupid}/expenses`))
  .catch(({message}) => notify('error', message));
};

export default connect(mapStateToProps, {
  createExpense,
  uploadImage,
  resetExpenseForm,
  appendExpenseForm,
  validateExpense,
  pushState,
  notify,
  fetchGroup,
  resetNotifications,
  fetchExpense,
  updateExpense
})(ExpenseEdit);

function mapStateToProps({router, form, notification, images, groups, expenses}) {
  const expense = form.expense;
  const groupid = router.params.groupid;
  const expenseid = router.params.expenseid;

  const initialExpense = expenses[expenseid] || {};
  initialExpense.amountText = initialExpense.amount/100;

  return {
    groupid,
    expenseid,
    initialExpense,
    group: groups[groupid] || {},
    notification,
    expense,
    tags: tags(groupid),
    enableVAT: vats(groupid),
    isUploading: images.isUploading || false
  };
}
