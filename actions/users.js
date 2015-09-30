import keys from 'lodash/object/keys';
import merge from 'lodash/object/merge';
import { fetchTransactions } from './transactions';
import { get } from '../lib/api';
import Schemas from '../lib/schemas';

/**
 * Constants
 */

export const USER_GROUPS_REQUEST = 'USER_GROUPS_REQUEST';
export const USER_GROUPS_SUCCESS = 'USER_GROUPS_SUCCESS';

export const USER_TRANSACTIONS_REQUEST = 'USER_TRANSACTIONS_REQUEST';
export const USER_TRANSACTIONS_SUCCESS = 'USER_TRANSACTIONS_SUCCESS';

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
