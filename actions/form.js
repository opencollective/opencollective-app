import transactionIsValid from '../validators/transaction';
import loginIsValid from '../validators/login';

/**
 * Constants
 */

export const RESET_TRANSACTION_FORM = 'RESET_TRANSACTION_FORM';
export const APPEND_TRANSACTION_FORM = 'APPEND_TRANSACTION_FORM';

export const VALIDATE_TRANSACTION = 'VALIDATE_TRANSACTION';
export const VALIDATE_TRANSACTION_SUCCESS = 'VALIDATE_TRANSACTION_SUCCESS';
export const VALIDATE_TRANSACTION_FAILURE = 'VALIDATE_TRANSACTION_FAILURE';

export const RESET_LOGIN_FORM = 'RESET_LOGIN_FORM';
export const APPEND_LOGIN_FORM = 'APPEND_LOGIN_FORM';

export const VALIDATE_LOGIN_SUCCESS = 'VALIDATE_LOGIN_SUCCESS';
export const VALIDATE_LOGIN_FAILURE = 'VALIDATE_LOGIN_FAILURE';

/**
 * Reset transaction form
 */

export function resetTransactionForm() {
  return {
    type: RESET_TRANSACTION_FORM
  };
}


/**
 * Append field in transaction form
 */

export function appendTransactionForm(attributes) {
  return {
    type: APPEND_TRANSACTION_FORM,
    attributes,
  };
}

/**
 * Validate transaction form
 */

export function validateTransaction(newTransaction) {
  const success = validateTransactionSuccess;
  const failure = validateTransactionFailure;

  return dispatch => {
    return transactionIsValid(newTransaction)
    .then(transaction => dispatch(success(transaction)))
    .catch(error => dispatch(failure(error)));
  };
}

function validateTransactionSuccess(transaction) {
  return {
    type: VALIDATE_TRANSACTION_SUCCESS,
    transaction
  };
}

function validateTransactionFailure(error) {
  return {
    type: VALIDATE_TRANSACTION_FAILURE,
    error
  };
}

/**
 * Reset Login form
 */

export function resetLoginForm() {
  return {
    type: RESET_LOGIN_FORM
  };
}

/**
 * Append field in login form
 */

export function appendLoginForm(attributes) {
  return {
    type: APPEND_LOGIN_FORM,
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
    type: VALIDATE_LOGIN_SUCCESS,
    attributes
  };
}

function validateLoginFailure(error) {
  return {
    type: VALIDATE_LOGIN_FAILURE,
    error
  };
}

