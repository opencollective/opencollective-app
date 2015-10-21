import merge from 'lodash/object/merge';
import {
  USER_GROUPS_SUCCESS,
  USER_TRANSACTIONS_SUCCESS,
  FETCH_USER_SUCCESS,
  GET_APPROVAL_KEY_FOR_USER_REQUEST,
  GET_APPROVAL_KEY_FOR_USER_SUCCESS,
  GET_APPROVAL_KEY_FOR_USER_FAILURE
} from '../actions/users';

export default function users(state={}, action={}) {
  const { groups, transactions, userid, type } = action;

  switch (type) {

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

    case GET_APPROVAL_KEY_FOR_USER_REQUEST:
      return merge({}, state, { inProgress: true });

    case GET_APPROVAL_KEY_FOR_USER_SUCCESS:
    case GET_APPROVAL_KEY_FOR_USER_FAILURE:
      return merge({}, state, { inProgress: false });


    default:
      return state;
  }
}

