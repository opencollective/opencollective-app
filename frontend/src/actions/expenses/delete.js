import * as api from '../../lib/api';
import * as constants from '../../constants/expenses';

/**
 * Deletea a expense from a group
 */

export default (groupid, expenseid) => {
  return dispatch => {
    dispatch(request(groupid, expenseid));

    return api.del(`groups/${groupid}/expenses/${expenseid}`)
      .then(json => dispatch(success(groupid, expenseid, json)))
      .catch(error => {
        dispatch(failure(error));
        throw new Error(error.message);
      });
  };
};

function request(groupid, expenseid) {
  return {
    type: constants.DELETE_EXPENSE_REQUEST,
    groupid,
    expenseid
  };
}

function success(groupid, expenseid) {
  return {
    type: constants.DELETE_EXPENSE_SUCCESS,
    groupid,
    expenseid
  };
}

function failure(error) {
  return {
    type: constants.DELETE_EXPENSE_FAILURE,
    error
  };
}
