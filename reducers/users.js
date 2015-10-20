import merge from 'lodash/object/merge';
import {
  USER_GROUPS_SUCCESS,
  USER_TRANSACTIONS_SUCCESS,
  FETCH_USER_SUCCESS,
  GET_APPROVAL_KEY_REQUEST,
  GET_APPROVAL_KEY_SUCCESS,
  GET_APPROVAL_KEY_FAILURE
} from '../actions/users';

export default function users(state={}, action={}) {
  const { groups, transactions, userid } = action;

  switch (action.type) {

    case USER_GROUPS_SUCCESS:
      return merge({}, state, {
        [userid]: { groups }
      });

    case USER_TRANSACTIONS_SUCCESS:
      return merge({}, state, {
        [userid]: { transactions }
      });

    case FETCH_USER_SUCCESS:
      return merge({}, state, action.users);

    case GET_APPROVAL_KEY_REQUEST:
      return merge({}, state, { inProgress: true });

    case GET_APPROVAL_KEY_SUCCESS:
    case GET_APPROVAL_KEY_FAILURE:
      return merge({}, state, { inProgress: false });


    default:
      return state;
  }
}

