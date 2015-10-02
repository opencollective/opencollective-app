import merge from 'lodash/object/merge';
import { GROUP_SUCCESS, GROUPS_SUCCESS } from '../actions/groups';

const initialState = {};

export default function groups(state = initialState, action) {
  switch (action.type) {

    case GROUP_SUCCESS:
    case GROUPS_SUCCESS:
      return merge({}, state, action.groups);

    default:
      return state;
  }
}

