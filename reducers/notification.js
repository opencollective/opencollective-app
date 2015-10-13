import {
  NOTIFY,
} from '../actions/notification';

export default function notification(state={}, action={}) {
  switch (action.type) {
    case NOTIFY:
      return {
        status: action.status,
        message: action.message
      };

    default:
      return state;
  }
}
