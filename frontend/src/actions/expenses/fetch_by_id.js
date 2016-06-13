import { get } from '../../lib/api';
import Schemas from '../../lib/schemas';
import * as constants from '../../constants/expenses';

/**
 * Fetch one expense in a group
 */

export default (groupid, expenseid) => {
  return dispatch => {
    dispatch(request(groupid, expenseid));

    return get(`groups/${groupid}/expenses/${expenseid}`, {
      schema: Schemas.EXPENSE
    })
    .then(json => dispatch(success(groupid, expenseid, json)))
    .catch(error => dispatch(failure(error)));
  };
};

function request(groupid, expenseid) {
  return {
    type: constants.EXPENSE_REQUEST,
    groupid,
    expenseid
  };
}

function success(groupid, expenseid, json) {
  return {
    type: constants.EXPENSE_SUCCESS,
    groupid,
    expenseid,
    expenses: json.expenses,
  };
}

function failure(error) {
  return {
    type: constants.EXPENSE_FAILURE,
    error,
  };
}
