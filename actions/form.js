import transactionIsValid from '../validators/transaction';
import loginIsValid from '../validators/login';
import * as constants from '../constants/form';

/**
 * Reset transaction form
 */

export function resetTransactionForm() {
  return {
    type: constants.RESET_TRANSACTION_FORM
  };
}


/**
 * Append field in transaction form
 */

export function appendTransactionForm(attributes) {
  return {
    type: constants.APPEND_TRANSACTION_FORM,
    attributes,
  };
}

/**
 * Validate transaction form
 */

export function validateTransaction(newTransaction) {
  const request = validateTransactionRequest;
  const success = validateTransactionSuccess;
  const failure = validateTransactionFailure;

  return dispatch => {
    dispatch(request(newTransaction));
    return transactionIsValid(newTransaction)
    .then(transaction => dispatch(success(transaction)))
    .catch(error => dispatch(failure(error)));
  };
}

function validateTransactionRequest(transaction) {
  return {
    type: constants.VALIDATE_TRANSACTION_REQUEST,
    transaction
  };
}

function validateTransactionSuccess(transaction) {
  return {
    type: constants.VALIDATE_TRANSACTION_SUCCESS,
    transaction
  };
}

function validateTransactionFailure(error) {
  return {
    type: constants.VALIDATE_TRANSACTION_FAILURE,
    error
  };
}

/**
 * Reset Login form
 */

export function resetLoginForm() {
  return {
    type: constants.RESET_LOGIN_FORM
  };
}

/**
 * Append field in login form
 */

export function appendLoginForm(attributes) {
  return {
    type: constants.APPEND_LOGIN_FORM,
    attributes,
  };
}

/**
 * Validate login form
 */

export function validateLogin(attributes) {
  const success = validateLoginSuccess;
  const failure = validateLoginFailure;

  return dispatch => {
    return loginIsValid(attributes)
    .then(attributes => dispatch(success(attributes)))
    .catch(error => dispatch(failure(error)));
  };
}

function validateLoginSuccess(attributes) {
  return {
    type: constants.VALIDATE_LOGIN_SUCCESS,
    attributes
  };
}

function validateLoginFailure(error) {
  return {
    type: constants.VALIDATE_LOGIN_FAILURE,
    error
  };
}

