import merge from 'lodash/object/merge';
import { GROUP_SUCCESS, GROUPS_SUCCESS } from '../constants/groups';

export default function groups(state={}, action={}) {
  switch (action.type) {

    case GROUP_SUCCESS:
    case GROUPS_SUCCESS:
      return merge({}, state, action.groups);

    default:
      return state;
  }
}

