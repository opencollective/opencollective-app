import { get } from '../lib/api';

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
    return get(`groups/${id}`)
      .then(json => dispatch(receiveGroup(id, json)));
  };
}

function receiveGroup(id, json) {
  return {
    type: RECEIVE_GROUP,
    id,
    group: json,
    receivedAt: Date.now()
  };
}

export function fetchTransactions(groupid) {
    return dispatch => {
    return get(`groups/${groupid}/transactions`)
      .then(json => dispatch(receiveTransactions(groupid, json)));
  };
}

function receiveTransactions(groupid, json) {
    return {
    type: RECEIVE_TRANSACTIONS,
    groupid,
    transactions: json,
    receivedAt: Date.now()
  };
}
