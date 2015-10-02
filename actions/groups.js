import { get } from '../lib/api';
import Schemas from '../lib/schemas';

/**
 * Constants
 */

export const GROUP_REQUEST = 'GROUP_REQUEST';
export const GROUP_SUCCESS = 'GROUP_SUCCESS';

/**
 * Fetch one group
 */

export function fetchGroup(id) {
  return dispatch => {
    return get(`groups/${id}`, Schemas.GROUP)
      .then(json => dispatch(receiveGroup(id, json)));
  };
}

function receiveGroup(id, json) {
  return {
    type: GROUP_SUCCESS,
    id,
    groups: json.groups,
    receivedAt: Date.now(),
  };
}

