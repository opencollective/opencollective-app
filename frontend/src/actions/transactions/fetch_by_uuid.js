import { get } from '../../lib/api';
import Schemas from '../../lib/schemas';
import * as constants from '../../constants/transactions';

/**
 * Fetch one transaction in a group
 */

export default (groupid, transactionuuid) => {
  return dispatch => {
    dispatch(request(groupid, transactionuuid));

    return get(`groups/${groupid}/transactions/${transactionuuid}`, {
      schema: Schemas.TRANSACTION
    })
    .then(json => dispatch(success(groupid, transactionuuid, json)))
    .catch(error => dispatch(failure(error)));
  };
};

function request(groupid, transactionuuid) {
  return {
    type: constants.TRANSACTION_REQUEST,
    groupid,
    transactionuuid
  };
}

function success(groupid, transactionuuid, json) {
  return {
    type: constants.TRANSACTION_SUCCESS,
    groupid,
    transactionuuid,
    transactions: json.transactions,
  };
}

function failure(error) {
  return {
    type: constants.TRANSACTION_FAILURE,
    error,
  };
}
