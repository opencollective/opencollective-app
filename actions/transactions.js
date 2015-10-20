import { get, postJSON } from '../lib/api';
import Schemas from '../lib/schemas';

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

export const PAY_TRANSACTION_REQUEST = 'PAY_TRANSACTION_REQUEST';
export const PAY_TRANSACTION_SUCCESS = 'PAY_TRANSACTION_SUCCESS';
export const PAY_TRANSACTION_FAILURE = 'PAY_TRANSACTION_FAILURE';

/**
 * Fetch multiple transactions in a group
 */

export function fetchTransactions(groupid) {
  return dispatch => {
    dispatch(transactionsRequest(groupid));
    return get(`groups/${groupid}/transactions`, {
      schema: Schemas.TRANSACTION_ARRAY
    })
    .then(json => dispatch(transactionsSuccess(groupid, json)))
    .catch(error => dispatch(transactionsFailure(error)));
  };
}

function transactionsRequest(groupid) {
  return {
    type: TRANSACTIONS_REQUEST,
    groupid
  };
}

function transactionsSuccess(groupid, json) {
  return {
    type: TRANSACTIONS_SUCCESS,
    groupid,
    transactions: json.transactions,
  };
}

function transactionsFailure(error) {
  return {
    type: TRANSACTIONS_FAILURE,
    error,
  };
}

/**
 * Fetch one transaction in a group
 */

export function fetchTransaction(groupid, transactionid) {
  return dispatch => {
    dispatch(transactionRequest(groupid, transactionid));
    return get(`groups/${groupid}/transactions/${transactionid}`, {
      schema: Schemas.TRANSACTION
    })
    .then(json => dispatch(transactionSuccess(groupid, transactionid, json)))
    .catch(error => dispatch(transactionFailure(error)));
  };
}

function transactionRequest(groupid, transactionid) {
  return {
    type: TRANSACTION_REQUEST,
    groupid,
    transactionid
  };
}

function transactionSuccess(groupid, transactionid, json) {
  return {
    type: TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    transactions: json.transactions,
  };
}

function transactionFailure(error) {
  return {
    type: TRANSACTION_FAILURE,
    error,
  };
}

/**
 * Approve a transaction in a group
 */

export function approveTransaction(groupid, transactionid) {
  const url = `groups/${groupid}/transactions/${transactionid}/approve`;

  return dispatch => {
    dispatch(approveTransactionRequest(groupid, transactionid));
    return postJSON(url, {approved: true})
      .then(json => dispatch(approveTransactionSuccess(groupid, transactionid, json)))
      .catch(error => dispatch(approveTransactionFailure(error)));
  };
}

function approveTransactionRequest(groupid, transactionid) {
  return {
    type: APPROVE_TRANSACTION_REQUEST,
    groupid,
    transactionid
  };
}

function approveTransactionSuccess(groupid, transactionid, json) {
  return {
    type: APPROVE_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
  };
}

function approveTransactionFailure(error) {
  return {
    type: APPROVE_TRANSACTION_FAILURE,
    error,
  };
}

/**
 * Reject a transaction in a group
 */

export function rejectTransaction(groupid, transactionid) {
  const url = `groups/${groupid}/transactions/${transactionid}/approve`;

  return dispatch => {
    dispatch(rejectTransactionRequest(groupid, transactionid));
    return postJSON(url, {approved: false})
      .then(json => dispatch(rejectTransactionSuccess(groupid, transactionid, json)))
      .catch(error => dispatch(rejectTransactionFailure(error)));
  };
}

function rejectTransactionRequest(groupid, transactionid) {
  return {
    type: REJECT_TRANSACTION_REQUEST,
    groupid,
    transactionid
  };
}

function rejectTransactionSuccess(groupid, transactionid, json) {
  return {
    type: REJECT_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    response: json,
  };
}

function rejectTransactionFailure(error) {
  return {
    type: REJECT_TRANSACTION_FAILURE,
    error,
  };
}

/**
 * Create a new transaction in a group
 */

export function createTransaction(groupid, transaction) {
  const url = `groups/${groupid}/transactions/`;

  return dispatch => {
    dispatch(createTransactionRequest(groupid, transaction));
    return postJSON(url, {transaction})
      .then(json => dispatch(createTransactionSuccess(groupid, json)))
      .catch(error => dispatch(createTransactionFailure(error)));
  };
}

function createTransactionRequest(groupid, transaction) {
  return {
    type: CREATE_TRANSACTION_REQUEST,
    groupid,
    transaction
  };
}

function createTransactionSuccess(groupid, transaction) {
  const transactions = {
    [transaction.id]: transaction
  };

  return {
    type: CREATE_TRANSACTION_SUCCESS,
    groupid,
    transactions,
  };
}

function createTransactionFailure(error) {
  return {
    type: CREATE_TRANSACTION_FAILURE,
    error,
  };
}

/**
 * Pay a transaction
 */

export function payTransaction(groupid, transactionid) {
  const url = `groups/${groupid}/transactions/${transactionid}/pay`;
  const request = payTransactionRequest;
  const success = payTransactionSuccess;
  const failure = payTransactionFailure;

  return dispatch => {
    dispatch(request(groupid, transactionid));
    return postJSON(url, { service: 'paypal' })
      .then(json => dispatch(success(groupid, transactionid, json)))
      .catch(error => dispatch(failure(error)));
  };
}

function payTransactionRequest(groupid, transactionid) {
  return {
    type: PAY_TRANSACTION_REQUEST,
    groupid,
    transactionid
  };
}

function payTransactionSuccess(groupid, transactionid, json) {
  return {
    type: PAY_TRANSACTION_SUCCESS,
    groupid,
    transactionid,
    json
  };
}

function payTransactionFailure(error) {
  return {
    type: PAY_TRANSACTION_FAILURE,
    error,
  };
}
