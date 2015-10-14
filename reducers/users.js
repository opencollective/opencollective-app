import merge from 'lodash/object/merge';
import {
  USER_GROUPS_SUCCESS,
  USER_TRANSACTIONS_SUCCESS,
  FETCH_USER_SUCCESS
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

    default:
      return state;
  }
}

