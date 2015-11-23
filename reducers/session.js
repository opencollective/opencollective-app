import merge from 'lodash/object/merge';
import * as constants from '../constants/session';

export default function session(state={
  user: {}
}, action={
  hasPopOverMenuOpen: false
}) {
  switch (action.type) {

    case constants.DECODE_JWT_SUCCESS:
      return merge({}, state, {
        user: action.info
      });

    case constants.SHOW_POPOVERMENU:
      return merge({}, state, { hasPopOverMenuOpen: action.hasPopOverMenuOpen });

    default:
      return state;
  }
}

