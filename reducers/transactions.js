import merge from 'lodash/object/merge';
import {
  TRANSACTIONS_SUCCESS,
  TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE
} from '../actions/transactions';

export default function transactions(state={}, action={}) {
  const { type } = action;

  switch (type) {

    case TRANSACTIONS_SUCCESS:
    case TRANSACTION_SUCCESS:
    case CREATE_TRANSACTION_SUCCESS:
      return merge({}, state, action.transactions);

    case CREATE_TRANSACTION_FAILURE:
      const error = action.error;
      return merge({}, state, { error });
    default:
      return state;
  }
}

