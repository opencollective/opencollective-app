import { get } from '../../lib/api';
import Schemas from '../../lib/schemas';
import * as constants from '../../constants/transactions';

/**
 * Fetch multiple transactions in a group
 */

export default (groupid, options={}) => {
  const params = options.per_page ? `?per_page=${options.per_page}` : '';

  return dispatch => {
    dispatch(request(groupid));
    return get(`groups/${groupid}/transactions${params}`, {
      schema: Schemas.TRANSACTION_ARRAY
    })
    .then(json => dispatch(success(groupid, json)))
    .catch(error => dispatch(failure(error)));
  };
};

function request(groupid) {
  return {
    type: constants.TRANSACTIONS_REQUEST,
    groupid
  };
}

function success(groupid, json) {
  return {
    type: constants.TRANSACTIONS_SUCCESS,
    groupid,
    transactions: json.transactions,
  };
}

function failure(error) {
  return {
    type: constants.TRANSACTIONS_FAILURE,
    error,
  };
}
