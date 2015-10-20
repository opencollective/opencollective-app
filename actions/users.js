import keys from 'lodash/object/keys';
import merge from 'lodash/object/merge';
import { fetchTransactions } from './transactions';
import { get, post } from '../lib/api';
import Schemas from '../lib/schemas';

/**
 * Constants
 */

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const USER_GROUPS_REQUEST = 'USER_GROUPS_REQUEST';
export const USER_GROUPS_SUCCESS = 'USER_GROUPS_SUCCESS';
export const USER_GROUPS_FAILURE = 'USER_GROUPS_FAILURE';

export const USER_TRANSACTIONS_REQUEST = 'USER_TRANSACTIONS_REQUEST';
export const USER_TRANSACTIONS_SUCCESS = 'USER_TRANSACTIONS_SUCCESS';
export const USER_TRANSACTIONS_FAILURE = 'USER_TRANSACTIONS_FAILURE';

export const GET_APPROVAL_KEY_REQUEST = 'GET_APPROVAL_KEY_REQUEST';
export const GET_APPROVAL_KEY_SUCCESS = 'GET_APPROVAL_KEY_SUCCESS';
export const GET_APPROVAL_KEY_FAILURE = 'GET_APPROVAL_KEY_FAILURE';

export const CONFIRM_APPROVAL_KEY_REQUEST = 'CONFIRM_APPROVAL_KEY_REQUEST';
export const CONFIRM_APPROVAL_KEY_SUCCESS = 'CONFIRM_APPROVAL_KEY_SUCCESS';
export const CONFIRM_APPROVAL_KEY_FAILURE = 'CONFIRM_APPROVAL_KEY_FAILURE';

/**
 * Fetch a user
 */

export function fetchUserIfNeeded(id) {
  return (dispatch, getState) => {
    const user = getState().users[id];
    if (!user || !user.id) {
      return dispatch(fetchUser(id));
    }
  };
}

export function fetchUser(id) {
  return dispatch => {
    dispatch(fetchUserRequest(id));
    return get(`users/${id}`, { schema: Schemas.USER })
      .then(json => dispatch(fetchUserSuccess(id, json)))
      .catch(err => dispatch(fetchUserFailure(err)));
  };
}

function fetchUserRequest(id) {
  return {
    type: FETCH_USER_REQUEST,
    id
  };
}

function fetchUserSuccess(id, json) {
  return {
    type: FETCH_USER_SUCCESS,
    id,
    users: json.users,
  };
}

function fetchUserFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    error,
  };
}

/**
 * Fetch all the groups from a user
 */

export function fetchUserGroups(userid) {
  return dispatch => {
    dispatch(userGroupsRequest(userid));
    return get(`users/${userid}/groups`, { schema: Schemas.GROUP_ARRAY })
      .then(json => dispatch(userGroupsSuccess(userid, json)))
      .catch(err => dispatch(userGroupsFailure(err)));
  };
}

function userGroupsRequest(userid) {
  return {
    type: USER_GROUPS_REQUEST,
    userid
  };
}

function userGroupsSuccess(userid, json) {
  return {
    type: USER_GROUPS_SUCCESS,
    userid,
    groups: json.groups,
  };
}

function userGroupsFailure(error) {
  return {
    type: USER_GROUPS_FAILURE,
    error,
  };
}

/**
 * This action doesn't scale well, we will need to add an api route to handle
 * that type of data fetching, we will leave it here for the prototype
 */

export function fetchUserGroupsAndTransactions(userid) {
  return dispatch => {
    dispatch(userTransactionsRequest(userid));
    return dispatch(fetchUserGroups(userid))
    .then((json) => {
      const groupids = keys(json.groups);
      const promises = groupids.map((groupid) => dispatch(fetchTransactions(groupid)));
      return Promise.all(promises);
    })
    .then((json) => {
      const merged = merge.apply(null, json) || {};
      return dispatch(userTransactionsSuccess(userid, merged));
    })
    .catch(error => dispatch(userTransactionsFailure(error)));
  };
}

function userTransactionsRequest(userid) {
  return {
    type: USER_TRANSACTIONS_REQUEST,
    userid
  };
}

function userTransactionsSuccess(userid, {transactions}) {
  return {
    type: USER_TRANSACTIONS_SUCCESS,
    userid,
    transactions,
  };
}

function userTransactionsFailure(error) {
  return {
    type: USER_TRANSACTIONS_FAILURE,
    error,
  };
}

/**
 * Get approval key for paypal
 */

export function getApprovalKey(userid, options={}) {
  const callback = 'http://localhost:3000/?approvalStatus=';
  const params = {
    returnUrl: callback + 'success&preapprovalKey=${preapprovalKey}',
    cancelUrl: callback + 'cancel',
    endingDate: new Date('2020-01-01').toISOString(),
    maxTotalAmountOfAllPayments: options.maxTotalAmountOfAllPayments || 2000
  };

  return dispatch => {
    dispatch(getApprovalKeyRequest(userid));
    return get(`users/${userid}/paypal/preapproval`, { params })
      .then(json => dispatch(getApprovalKeySuccess(userid, json)))
      .catch(err => dispatch(getApprovalKeyFailure(err)));
  };
}

function getApprovalKeyRequest(userid) {
  return {
    type: GET_APPROVAL_KEY_REQUEST,
    userid
  };
}

function getApprovalKeySuccess(userid, json) {
  window.location = json.preapprovalUrl;

  return {
    type: GET_APPROVAL_KEY_SUCCESS,
    userid,
    json
  };
}

function getApprovalKeyFailure(error) {
  return {
    type: GET_APPROVAL_KEY_FAILURE,
    error
  };
}


/**
 * Confirm approval key
 */

export function confirmApprovalKey(userid, preapprovalKey) {
  const url = `users/${userid}/paypal/preapproval/${preapprovalKey}`;
  const request = confirmApprovalKeyRequest;
  const success = confirmApprovalKeySuccess;
  const failure = confirmApprovalKeyFailure;

  return dispatch => {
    dispatch(request(userid, preapprovalKey));
    return post(url)
      .then(json => dispatch(success(userid, preapprovalKey, json)))
      .catch(err => dispatch(failure(err)));
  };
}

function confirmApprovalKeyRequest(userid, preapprovalKey) {
  return {
    type: CONFIRM_APPROVAL_KEY_REQUEST,
    preapprovalKey,
    userid
  };
}

function confirmApprovalKeySuccess(userid, preapprovalKey, json) {
  return {
    type: CONFIRM_APPROVAL_KEY_SUCCESS,
    userid,
    preapprovalKey,
    json
  };
}

function confirmApprovalKeyFailure(error) {
  return {
    type: CONFIRM_APPROVAL_KEY_FAILURE,
    error
  };
}

