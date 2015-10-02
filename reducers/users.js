import merge from 'lodash/object/merge';
import {
  USER_GROUPS_SUCCESS,
  USER_TRANSACTIONS_SUCCESS,
  USER_INFO_SUCCESS
} from '../actions/users';

const initialState = {};

export default function users(state = initialState, action) {
  switch (action.type) {

    case USER_GROUPS_SUCCESS:
      const groups = action.response.groups;
      return merge({}, state, {groups});

    case USER_TRANSACTIONS_SUCCESS:
      const transactions = action.response.transactions;
      return merge({}, state, {transactions});

    case USER_INFO_SUCCESS:
      const info = action.json;
      return merge({}, state, {info});

    default:
      return state;
  }
}

