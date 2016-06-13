import { get } from '../../lib/api';
import Schemas from '../../lib/schemas';
import * as constants from '../../constants/expenses';

/**
 * Fetch multiple expenses in a group
 */

export default (groupid, options={}) => {
  return dispatch => {
    dispatch(request(groupid));
    return get(`groups/${groupid}/expenses`, {
      schema: Schemas.EXPENSE_ARRAY,
      params: options || {}
    })
    .then(json => dispatch(success(groupid, json)))
    .catch(error => dispatch(failure(error)));
  };
};

function request(groupid) {
  return {
    type: constants.EXPENSES_REQUEST,
    groupid
  };
}

function success(groupid, json) {
  return {
    type: constants.EXPENSES_SUCCESS,
    groupid,
    expenses: json.expenses,
  };
}

function failure(error) {
  return {
    type: constants.EXPENSES_FAILURE,
    error,
  };
}
