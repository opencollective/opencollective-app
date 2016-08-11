import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import fetchGroup from '../actions/groups/fetch_by_id';
import createExpense from '../actions/expenses/create';
import resetExpenseForm from '../actions/form/reset_expense';
import appendExpenseForm from '../actions/form/append_expense';
import validateExpense from '../actions/form/validate_expense';
import uploadImage from '../actions/images/upload';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';

import tags from '../ui/tags';
import vats from '../ui/vat';

import Content from './Content';

import ExpenseForm from '../components/ExpenseForm';
import TopBar from '../components/TopBar';

export class ExpenseNew extends Component {
  render() {
    return (
      <div>
        <TopBar
          title='Submit Expense'
          backLink={`/groups/${this.props.groupid}/expenses/`} />
        <Content>
          <ExpenseForm
            {...this.props}
            handleSubmit={createExpenseFn.bind(this)} />
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.groupid);
  }
};

export function createExpenseFn() {
  const {
    notify,
    groupid,
    pushState,
    createExpense,
    group,
    validateExpense,
    expense
  } = this.props;
  const attributes = {
    ...expense.attributes,
    amount: Math.round(100 * expense.attributes.amountText)
  };
  delete attributes.amountText;

  return validateExpense(attributes)
  .then(() => createExpense(group.id, attributes))
  .then(() => pushState(null, `/groups/${groupid}/expenses`))
  .catch(error => notify('error', error.message));
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
  resetNotifications
})(ExpenseNew);

function mapStateToProps({router, form, notification, images, groups}) {
  const expense = form.expense;
  const groupid = router.params.groupid;

  return {
    groupid,
    group: groups[groupid] || {},
    notification,
    expense,
    tags: tags(groupid),
    enableVAT: vats(groupid),
    isUploading: images.isUploading || false
  };
}
