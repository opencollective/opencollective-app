import { RECEIVE_GROUP } from '../actions';

const initialState = [];

export default function groups(state = initialState, action) {

  switch(action.type) {

    case RECEIVE_GROUP:
      return [action.group];

    default:
      return state;
  }
}

