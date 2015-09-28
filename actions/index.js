import fetch from 'isomorphic-fetch';

/**
 * Constants
 */

export const APPROVE_TRANSACTION = 'APPROVE_TRANSACTION';
export const REJECT_TRANSACTION = 'REJECT_TRANSACTION';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';

export const FETCH_GROUP = 'FETCH_GROUP';
export const RECEIVE_GROUP = 'RECEIVE_GROUP';

/**
 * API Url until full integration
 */

const API_ROOT = 'https://private-04792-opencollective.apiary-mock.com/';

/**
 * Actions
 */

export function fetchGroup(id) {
  return dispatch => {
    return callAPI(`groups/${id}`)
      .then(json => dispatch(receiveGroup(id, json)));
  };
}

function receiveGroup(id, json) {
  return {
    type: RECEIVE_GROUP,
    id,
    group: json,
    receivedAt: Date.now()
  };
}

function callAPI(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response => response.json());
}

