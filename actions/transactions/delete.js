import * as api from '../../lib/api';
import * as constants from '../../constants/transactions';

/**
 * Deletea a transaction from a group
 */

export default (groupid, transactionid) => {
  return dispatch => {
    dispatch(request(groupid, transactionid));

    return api.del(`groups/${groupid}/transactions/${transactionid}`)
      .then(json => dispatch(success(groupid, transactionid, json)))
      .catch(error => dispatch(failure(error)));
  };
};

function request(groupid, transactionid) {
  return {
    type: constants.DELETE_TRANSACTION_REQUEST,
    groupid,
    transactionid
  };
}

function success(groupid, transactionid, json) {
  return {
    type: constants.DELETE_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    transactions: json.transactions,
  };
}

function failure(error) {
  return {
    type: constants.DELETE_TRANSACTION_FAILURE,
    error,
  };
}
