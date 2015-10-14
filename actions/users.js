import keys from 'lodash/object/keys';
import merge from 'lodash/object/merge';
import jwtDecode from 'jwt-decode';
import { fetchTransactions } from './transactions';
import { groupSuccess } from './groups';
import { get, auth } from '../lib/api';
import env from '../lib/env';
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
    return get(`users/${id}`, Schemas.USER)
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
    receivedAt: Date.now(),
  };
}

function fetchUserFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    error,
    receivedAt: Date.now(),
  };
}

/**
 * Fetch all the groups from a user
 */

export function fetchUserGroups(userid) {
  return dispatch => {
    dispatch(userGroupsRequest(userid));
    return get(`users/${userid}/groups`, Schemas.GROUP_ARRAY)
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
    receivedAt: Date.now(),
  };
}

function userGroupsFailure(error) {
  return {
    type: USER_GROUPS_FAILURE,
    error,
    receivedAt: Date.now(),
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
    receivedAt: Date.now(),
  };
}

function userTransactionsFailure(error) {
  return {
    type: USER_TRANSACTIONS_FAILURE,
    error,
    receivedAt: Date.now(),
  };
}


