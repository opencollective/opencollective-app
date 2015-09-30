import { get, postJSON, Schemas } from '../lib/api';

/**
 * Constants
 */

export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';

export const TRANSACTION_REQUEST = 'TRANSACTION_REQUEST';
export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';

export const APPROVE_TRANSACTION_REQUEST = 'APPROVE_TRANSACTION_REQUEST';
export const APPROVE_TRANSACTION_SUCCESS = 'APPROVE_TRANSACTION_SUCCESS';

export const REJECT_TRANSACTION_REQUEST = 'REJECT_TRANSACTION_REQUEST';
export const REJECT_TRANSACTION_SUCCESS = 'REJECT_TRANSACTION_SUCCESS';

/**
 * Fetch multiple transactions in a group
 */

export function fetchTransactions(groupid) {
  return dispatch => {
    return get(`groups/${groupid}/transactions`, Schemas.TRANSACTION_ARRAY)
      .then(json => dispatch(receiveTransactions(groupid, json)));
  };
}

function receiveTransactions(groupid, json) {
  return {
    type: TRANSACTIONS_SUCCESS,
    groupid,
    response: json,
    receivedAt: Date.now(),
  };
}

/**
 * Fetch one transaction in a group
 */

export function fetchTransaction(groupid, transactionid) {
  return dispatch => {
    return get(`groups/${groupid}/transactions/${transactionid}`, Schemas.TRANSACTION)
      .then(json => dispatch(receiveTransaction(groupid, transactionid, json)));
  };
}

function receiveTransaction(groupid, transactionid, json) {
  return {
    type: TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
    receivedAt: Date.now(),
  };
}

/**
 * Approve a transaction in a group
 */

export function approveTransaction(groupid, transactionid) {
  const url = `groups/${groupid}/transactions/${transactionid}/approve`;
  const body = {approved: true};

  return dispatch => {
    return postJSON(url, body)
      .then(json => dispatch(receiveApproveTransaction(groupid, transactionid, json)));
  };
}

function receiveApproveTransaction(groupid, transactionid, json) {
  return {
    type: APPROVE_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
    receivedAt: Date.now(),
  };
}

/**
 * Reject a transaction in a group
 */

export function rejectTransaction(groupid, transactionid) {
  const url = `groups/${groupid}/transactions/${transactionid}/approve`;
  const body = {approved: false};

  return dispatch => {
    return postJSON(url, body)
      .then(json => dispatch(receiveRejectTransaction(groupid, transactionid, json)));
  };
}

function receiveRejectTransaction(groupid, transactionid, json) {
  return {
    type: REJECT_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
    receivedAt: Date.now(),
  };
}
