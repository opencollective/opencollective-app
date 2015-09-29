import { get, Schemas } from '../lib/api';

/**
 * Constants
 */

export const FETCH_GROUP = 'FETCH_GROUP';
export const RECEIVE_GROUP = 'RECEIVE_GROUP';

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';


/**
 * Actions
 */

export function fetchGroup(id) {
  return dispatch => {
    return get(`groups/${id}`, Schemas.GROUP)
      .then(json => dispatch(receiveGroup(id, json)));
  };
}

function receiveGroup(id, json) {
  return {
    type: RECEIVE_GROUP,
    id,
    response: json,
    receivedAt: Date.now()
  };
}

export function fetchGroupsFromUser(userid) {
  return dispatch => {
    return get(`users/${userid}/groups`, Schemas.GROUP_ARRAY)
      .then(json => dispatch(receiveGroupsFromUser(userid, json)));
  };
}

function receiveGroupsFromUser(userid, json) {
  return {
    type: RECEIVE_GROUPS,
    userid,
    response: json,
    receivedAt: Date.now()
  };
}

