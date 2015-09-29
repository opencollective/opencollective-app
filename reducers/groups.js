import extend from 'lodash/object/extend';
import { RECEIVE_GROUP } from '../actions';

const initialState = {};

export default function groups(state = initialState, action) {
  switch(action.type) {

    case RECEIVE_GROUP:
      const data = action.response.groups;
      return extend({}, state.groups, data);

    default:
      return state;
  }
}

