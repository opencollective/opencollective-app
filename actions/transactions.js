import { get, Schemas } from '../lib/api';

/**
 * Constants
 */

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';

/**
 * Actions
 */

export function fetchTransactions(groupid) {
  return dispatch => {
    return get(`groups/${groupid}/transactions`, Schemas.TRANSACTION_ARRAY)
      .then(json => dispatch(receiveTransactions(groupid, json)));
  };
}

export function receiveTransactions(groupid, json) {
  return {
    type: RECEIVE_TRANSACTIONS,
    groupid,
    response: json,
    receivedAt: Date.now()
  };
}
