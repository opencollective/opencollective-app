import keys from 'lodash/object/keys';
import merge from 'lodash/object/merge';
import jwtDecode from 'jwt-decode';
import { fetchTransactions } from './transactions';
import { get, postJSON } from '../lib/api';
import env from '../lib/env';
import Schemas from '../lib/schemas';

/**
 * Constants
 */

export const USER_GROUPS_REQUEST = 'USER_GROUPS_REQUEST';
export const USER_GROUPS_SUCCESS = 'USER_GROUPS_SUCCESS';

export const USER_TRANSACTIONS_REQUEST = 'USER_TRANSACTIONS_REQUEST';
export const USER_TRANSACTIONS_SUCCESS = 'USER_TRANSACTIONS_SUCCESS';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

/**
 * Fetch all the groups from a user
 */

export function fetchUserGroups(userid) {
  return dispatch => {
    return get(`users/${userid}/groups`, Schemas.GROUP_ARRAY)
      .then(json => dispatch(receiveUserGroups(userid, json)));
  };
}

function receiveUserGroups(userid, json) {
  return {
    type: USER_GROUPS_SUCCESS,
    userid,
    response: json,
    receivedAt: Date.now(),
  };
}

/**
 * This action doesn't scale well, we will need to add an api route to handle
 * that type of data fetching, we will leave it here for the prototype
 */

export function fetchUserGroupsAndTransactions(userid) {
  return dispatch => {
    return dispatch(fetchUserGroups(userid))
    .then((json) => {
      const groupids = keys(json.response.groups);
      const promises = groupids.map((groupid) => dispatch(fetchTransactions(groupid)));
      return Promise.all(promises);
    })
    .then((json) => {
      const merged = merge.apply(null, json) || {};
      dispatch(receiveUserTransactions(userid, merged));
    });
  };
}

function receiveUserTransactions(userid, json) {
  return {
    type: USER_TRANSACTIONS_SUCCESS,
    userid,
    response: json.response,
    receivedAt: Date.now(),
  };
}

/**
 * Authenticate user
 */

export function login(email, password) {
  return dispatch => {
    const api_key = env.API_KEY;
    return postJSON('authenticate', {email, password, api_key})
      .then(json => dispatch(loginSuccess(json)));
  };
}

function loginSuccess(json) {
  localStorage.setItem('accessToken', json.access_token);
  localStorage.setItem('refreshToken', json.refresh_token);

  return {
    type: LOGIN_SUCCESS,
    json,
    receivedAt: Date.now(),
  };
}

/**
 * Load info from JWT if it exists
 */

export function loadUserInfo() {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return userInfoFailure();
  }

  const json = jwtDecode(accessToken);
  return json.id ? userInfoSuccess(json) : userInfoFailure();
}

function userInfoFailure() {
  window.location = '#/login';
  return {
    type: USER_INFO_FAILURE,
  };
}

function userInfoSuccess(json) {
  return {
    type: USER_INFO_SUCCESS,
    json,
  };
}
