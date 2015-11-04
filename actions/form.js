import transactionIsValid from '../validators/transaction';
import loginIsValid from '../validators/login';
import profileIsValid from '../validators/profile';
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
  const request = validateLoginRequest;
  const success = validateLoginSuccess;
  const failure = validateLoginFailure;

  return dispatch => {
    dispatch(request(attributes));
    return loginIsValid(attributes)
    .then(attributes => dispatch(success(attributes)))
    .catch(error => dispatch(failure(error)));
  };
}

function validateLoginRequest() {
  return {
    type: constants.VALIDATE_LOGIN_REQUEST
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

/**
 * Profile form
 */

export function setEditMode(isEditMode) {
  return {
    type: constants.SET_EDIT_MODE_PROFILE,
    isEditMode
  };
}

/**
 * Append field in profile form
 */

export function appendProfileForm(attributes) {
  return {
    type: constants.APPEND_PROFILE_FORM,
    attributes,
  };
}

/**
 * Validate transaction form
 */

export function validateProfile(newProfile) {
  const request = validateProfileRequest;
  const success = validateProfileSuccess;
  const failure = validateProfileFailure;

  return dispatch => {
    dispatch(request(newProfile));
    return profileIsValid(newProfile)
    .then(profile => dispatch(success(profile)))
    .catch(error => dispatch(failure(error)));
  };
}

function validateProfileRequest(profile) {
  return {
    type: constants.VALIDATE_PROFILE_REQUEST,
    profile
  };
}

function validateProfileSuccess(profile) {
  return {
    type: constants.VALIDATE_PROFILE_SUCCESS,
    profile
  };
}

function validateProfileFailure(error) {
  return {
    type: constants.VALIDATE_PROFILE_FAILURE,
    error
  };
}

