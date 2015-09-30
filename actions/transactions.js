import { get, postJSON, Schemas } from '../lib/api';

/**
 * Constants
 */

export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE';

export const TRANSACTION_REQUEST = 'TRANSACTION_REQUEST';
export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
export const TRANSACTION_FAILURE = 'TRANSACTION_FAILURE';

export const APPROVE_TRANSACTION_REQUEST = 'APPROVE_TRANSACTION_REQUEST';
export const APPROVE_TRANSACTION_SUCCESS = 'APPROVE_TRANSACTION_SUCCESS';
export const APPROVE_TRANSACTION_FAILURE = 'APPROVE_TRANSACTION_FAILURE';

export const REJECT_TRANSACTION_REQUEST = 'REJECT_TRANSACTION_REQUEST';
export const REJECT_TRANSACTION_SUCCESS = 'REJECT_TRANSACTION_SUCCESS';
export const REJECT_TRANSACTION_FAILURE = 'REJECT_TRANSACTION_FAILURE';

export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST';
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE';

/**
 * Fetch multiple transactions in a group
 */

export function fetchTransactions(groupid) {
  return dispatch => {
    return get(`groups/${groupid}/transactions`, Schemas.TRANSACTION_ARRAY)
      .then(json => dispatch(transactionsSuccess(groupid, json)))
      .catch(err => dispatch(transactionsFailure(err.message)));
  };
}

function transactionsSuccess(groupid, json) {
  return {
    type: TRANSACTIONS_SUCCESS,
    groupid,
    response: json,
    receivedAt: Date.now(),
  };
}

function transactionsFailure(message) {
  return {
    type: TRANSACTIONS_FAILURE,
    message,
    receivedAt: Date.now(),
  };
}

/**
 * Fetch one transaction in a group
 */

export function fetchTransaction(groupid, transactionid) {
  return dispatch => {
    return get(`groups/${groupid}/transactions/${transactionid}`, Schemas.TRANSACTION)
      .then(json => dispatch(transactionSuccess(groupid, transactionid, json)))
      .catch(err => dispatch(transactionFailure(err.message)));
  };
}

function transactionSuccess(groupid, transactionid, json) {
  return {
    type: TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
    receivedAt: Date.now(),
  };
}

function transactionFailure(message) {
  return {
    type: TRANSACTION_FAILURE,
    message,
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
      .then(json => dispatch(approveTransactionSuccess(groupid, transactionid, json)))
      .catch(err => dispatch(approveTransactionFailure(err.message)));
  };
}

function approveTransactionSuccess(groupid, transactionid, json) {
  return {
    type: APPROVE_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
    receivedAt: Date.now(),
  };
}

function approveTransactionFailure(message) {
  return {
    type: APPROVE_TRANSACTION_FAILURE,
    message,
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
      .then(json => dispatch(rejectTransactionSuccess(groupid, transactionid, json)))
      .catch(err => dispatch(rejectTransactionFailure(err.message)));
  };
}

function rejectTransactionSuccess(groupid, transactionid, json) {
  return {
    type: REJECT_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
    receivedAt: Date.now(),
  };
}

function rejectTransactionFailure(message) {
  return {
    type: REJECT_TRANSACTION_FAILURE,
    message,
    receivedAt: Date.now(),
  };
}

/**
 * Create a new transaction in a group
 */

export function createTransaction(groupid, transaction) {
  const url = `groups/${groupid}/transactions/`;

  return dispatch => {
    return postJSON(url, {transaction, group: {id: groupid}})
      .then(json => dispatch(receiveCreateTransaction(groupid, json)))
      .catch(err => dispatch(failureCreateTransaction(err.message)));
  };
}

function receiveCreateTransaction(groupid, json) {
  return {
    type: CREATE_TRANSACTION_SUCCESS,
    groupid,
    response: json,
    receivedAt: Date.now(),
  };
}

function failureCreateTransaction(message) {
  return {
    type: CREATE_TRANSACTION_FAILURE,
    message,
    receivedAt: Date.now(),
  };
}
