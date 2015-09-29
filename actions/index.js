import { get, Schemas } from '../lib/api';

/**
 * Constants
 */

export const APPROVE_TRANSACTION = 'APPROVE_TRANSACTION';
export const REJECT_TRANSACTION = 'REJECT_TRANSACTION';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';

export const FETCH_GROUP = 'FETCH_GROUP';
export const RECEIVE_GROUP = 'RECEIVE_GROUP';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';

/**
 * Actions
 */

export function fetchGroup(id) {
  return dispatch => {
    return get(`groups/${id}`, Schemas.GROUP)
      .then(json => dispatch(receiveGroup(id, json)));
  };
}

function receiveGroup(id, json) {
  console.log('receiveGroup', json);
  return {
    type: RECEIVE_GROUP,
    id,
    response: json,
    receivedAt: Date.now()
  };
}

export function fetchTransactions(groupid) {
  return dispatch => {
    return get(`groups/${groupid}/transactions`, Schemas.TRANSACTION_ARRAY)
      .then(json => dispatch(receiveTransactions(groupid, json)));
  };
}

function receiveTransactions(groupid, json) {
  console.log('receiveTransactions', groupid, json);
  return {
    type: RECEIVE_TRANSACTIONS,
    groupid,
    response: json,
    receivedAt: Date.now()
  };
}
