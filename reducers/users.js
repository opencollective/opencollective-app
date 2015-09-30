import merge from 'lodash/object/merge';
import { USER_GROUPS_SUCCESS, USER_TRANSACTIONS_SUCCESS } from '../actions/users';

const initialState = {};

export default function users(state = initialState, action) {
  switch (action.type) {

    case USER_GROUPS_SUCCESS:
      const groups = action.response.groups;
      const userGroups = {
        [action.userid]: {groups}
      };
      return merge({}, state, userGroups);

    case USER_TRANSACTIONS_SUCCESS:
      const transactions = action.response.transactions;
      const userTransactions = {
        [action.userid]: {transactions}
      };
      return merge({}, state, userTransactions);

    default:
      return state;
  }
}

