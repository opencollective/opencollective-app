import { get } from '../lib/api';
import Schemas from '../lib/schemas';
import * as constants from '../constants/groups';

/**
 * Fetch one group
 */

export function fetchGroup(id) {
  return dispatch => {
    dispatch(groupRequest(id));
    return get(`groups/${id}`, {
      schema: Schemas.GROUP
    })
    .then(json => dispatch(groupSuccess(id, json)))
    .catch(error => dispatch(groupFailure(id, error)));
  };
}

function groupRequest(id) {
  return {
    type: constants.GROUP_REQUEST,
    id
  };
}

function groupSuccess(id, json) {
  return {
    type: constants.GROUP_SUCCESS,
    id,
    groups: json.groups
  };
}

function groupFailure(id, error) {
  return {
    type: constants.GROUP_FAILURE,
    id,
    error
  };
}
