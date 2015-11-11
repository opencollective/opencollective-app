import merge from 'lodash/object/merge';
import * as constants from '../constants/session';

export default function session(state={
  user: {}
}, action={}) {
  switch (action.type) {

    case constants.DECODE_JWT_SUCCESS:
      return merge({}, state, {
        user: action.info
      });

    default:
      return state;
  }
}

