import { putJSON } from '../../lib/api';
import * as constants from '../../constants/transactions';

/**
 * Update a transaction in a group
 */

export default (groupid, transactionid, expense) => {
  transactionid = transactionid.slice(1);
  const url = `groups/${groupid}/expenses/${transactionid}`;

  return dispatch => {
    dispatch(request(groupid, expense));
    return putJSON(url, {expense})
      .then(e => {
        e.id = 'e'+e.id;
        return e;
      })
      .then(json => dispatch(success(groupid, json)))
      .catch(error => {
        dispatch(failure(error))
        throw new Error(error.message);
      });
  };
};

function request(groupid, expense) {
  return {
    type: constants.UPDATE_TRANSACTION_REQUEST,
    groupid,
    expense
  };
}

function success(groupid, expense) {
  const expenses = {
    [expense.id]: expense
  };

  return {
    type: constants.UPDATE_TRANSACTION_SUCCESS,
    groupid,
    expenses
  };
}

function failure(error) {
  return {
    type: constants.UPDATE_TRANSACTION_FAILURE,
    error,
  };
}
