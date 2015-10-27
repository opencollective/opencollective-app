import merge from 'lodash/object/merge';
import {
  DECODE_JWT_SUCCESS
} from '../actions/session';

export default function session(state={
  user: {}
}, action={}) {
  switch (action.type) {

    case DECODE_JWT_SUCCESS:
      return merge({}, state, {
        user: action.info
      });

    default:
      return state;
  }
}

