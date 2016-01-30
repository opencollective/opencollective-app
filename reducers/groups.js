import merge from 'lodash/object/merge';

import * as constants from '../constants/groups';

export default function groups(state={
  updated: {}
}, action={}) {
  switch (action.type) {

    case constants.GROUP_SUCCESS:
    case constants.GROUPS_SUCCESS:
      return merge({}, state, action.groups);

    case constants.GROUP_SUCCESS:
    case constants.GROUPS_SUCCESS:
      return merge({}, state, action.groups);

    default:
      return state;
  }
}

