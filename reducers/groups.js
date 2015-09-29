import extend from 'lodash/object/extend';
import { RECEIVE_GROUP, RECEIVE_GROUPS } from '../actions/groups';

const initialState = {};

export default function groups(state = initialState, action) {
  switch(action.type) {

    case RECEIVE_GROUP:
    case RECEIVE_GROUPS:
      const data = action.response.groups;
      return extend({}, state.groups, data);

    default:
      return state;
  }
}

