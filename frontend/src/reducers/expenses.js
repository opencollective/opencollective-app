import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

import * as constants from '../constants/expenses';

const defaults = {
  approveInProgress: false,
  rejectInProgress: false,
  payInProgress: false,
  updateInProgress: false
};

export default function expenses(state=defaults, action={}) {
  switch (action.type) {

    case constants.CREATE_EXPENSE_REQUEST:
      return merge({}, omit(state, 'error'));

    case constants.EXPENSES_SUCCESS:
    case constants.EXPENSE_SUCCESS:
    case constants.CREATE_EXPENSE_SUCCESS:
    case constants.UPDATE_EXPENSE_SUCCESS:
      var expenses = action.expenses;
      // divide all currency values by 100
      Object.keys(expenses).map((value) =>
          expenses[value] = Object.assign({}, expenses[value], {amount: expenses[value].amount /= 100}));
      return merge({}, state, expenses);

    case constants.CREATE_EXPENSE_FAILURE:
    case constants.UPDATE_EXPENSE_FAILURE:
      const error = action.error;
      return merge({}, state, { error });

    case constants.APPROVE_EXPENSE_REQUEST:
      return merge({}, state, { approveInProgress: true });

    case constants.APPROVE_EXPENSE_SUCCESS:
    case constants.APPROVE_EXPENSE_FAILURE:
      return merge({}, state, { approveInProgress: false });

    case constants.REJECT_EXPENSE_REQUEST:
      return merge({}, state, { rejectInProgress: true });

    case constants.REJECT_EXPENSE_SUCCESS:
    case constants.REJECT_EXPENSE_FAILURE:
      return merge({}, state, { rejectInProgress: false });

    case constants.PAY_EXPENSE_REQUEST:
      return merge({}, state, { payInProgress: true });

    case constants.PAY_EXPENSE_SUCCESS:
    case constants.PAY_EXPENSE_FAILURE:
      return merge({}, state, { payInProgress: false });

    case constants.UPDATE_EXPENSE_REQUEST:
      return merge({}, state, { updateInProgress: true });

    case constants.UPDATE_EXPENSE_SUCCESS:
    case constants.UPDATE_EXPENSE_FAILURE:
      return merge({}, state, { updateInProgress: false });

    case constants.DELETE_EXPENSE_SUCCESS:
      return merge({}, omit(state, action.expenseid));

    default:
      return state;
  }
}

