import keys from 'lodash/object/keys';
import merge from 'lodash/object/merge';
import { fetchTransactions } from './transactions';
import { get, post } from '../lib/api';
import Schemas from '../lib/schemas';
import * as constants from '../constants/users';

/**
 * Fetch a user
 */

export function fetchUserIfNeeded(id) {
  return (dispatch, getState) => {
    const user = getState().users[id];
    if (!user || !user.id) {
      return dispatch(fetchUser(id));
    } else {
      return dispatch(fetchUserFromState(user));
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

function fetchUserFromState(user) {
  return {
    type: constants.FETCH_USER_FROM_STATE,
    user
  };
}

function fetchUserRequest(id) {
  return {
    type: constants.FETCH_USER_REQUEST,
    id
  };
}

function fetchUserSuccess(id, json) {
  return {
    type: constants.FETCH_USER_SUCCESS,
    id,
    users: json.users,
  };
}

function fetchUserFailure(error) {
  return {
    type: constants.FETCH_USER_FAILURE,
    error,
  };
}

/**
 * Fetch all the groups from a user
 */

export function fetchUserGroups(userid) {
  return dispatch => {
    dispatch(userGroupsRequest(userid));
    return get(`users/${userid}/groups?include=usergroup.role`, {
        schema: Schemas.GROUP_ARRAY
      })
      .then(json => dispatch(userGroupsSuccess(userid, json)))
      .catch(err => dispatch(userGroupsFailure(err)));
  };
}

function userGroupsRequest(userid) {
  return {
    type: constants.USER_GROUPS_REQUEST,
    userid
  };
}

function userGroupsSuccess(userid, json) {
  return {
    type: constants.USER_GROUPS_SUCCESS,
    userid,
    groups: json.groups,
  };
}

function userGroupsFailure(error) {
  return {
    type: constants.USER_GROUPS_FAILURE,
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
    type: constants.USER_TRANSACTIONS_REQUEST,
    userid
  };
}

function userTransactionsSuccess(userid, {transactions}) {
  return {
    type: constants.USER_TRANSACTIONS_SUCCESS,
    userid,
    transactions,
  };
}

function userTransactionsFailure(error) {
  return {
    type: constants.USER_TRANSACTIONS_FAILURE,
    error,
  };
}

/**
 * Get approval key for paypal
 */

export function getApprovalKeyForUser(userid, options={}) {
  const request = getApprovalKeyForUserRequest;
  const success = getApprovalKeyForUserSuccess;
  const failure = getApprovalKeyForUserFailure;
  const root = window.location.href;
  const callback = `${root}?approvalStatus=`;

  const params = {
    returnUrl: callback + 'success&preapprovalKey=${preapprovalKey}',
    cancelUrl: callback + 'cancel',
    endingDate: new Date('2020-01-01').toISOString(),
    maxTotalAmountOfAllPayments: options.maxTotalAmountOfAllPayments || 2000
  };

  return dispatch => {
    dispatch(request(userid));
    return get(`users/${userid}/paypal/preapproval`, { params })
      .then(json => dispatch(success(userid, json)))
      .catch(err => dispatch(failure(err)));
  };
}

function getApprovalKeyForUserRequest(userid) {
  return {
    type: constants.GET_APPROVAL_KEY_FOR_USER_REQUEST,
    userid
  };
}

function getApprovalKeyForUserSuccess(userid, json) {
  window.location = json.preapprovalUrl;

  return {
    type: constants.GET_APPROVAL_KEY_FOR_USER_SUCCESS,
    userid,
    json
  };
}

function getApprovalKeyForUserFailure(error) {
  return {
    type: constants.GET_APPROVAL_KEY_FOR_USER_FAILURE,
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
    type: constants.CONFIRM_APPROVAL_KEY_REQUEST,
    preapprovalKey,
    userid
  };
}

function confirmApprovalKeySuccess(userid, preapprovalKey, json) {
  return {
    type: constants.CONFIRM_APPROVAL_KEY_SUCCESS,
    userid,
    preapprovalKey,
    json
  };
}

function confirmApprovalKeyFailure(error) {
  return {
    type: constants.CONFIRM_APPROVAL_KEY_FAILURE,
    error
  };
}

