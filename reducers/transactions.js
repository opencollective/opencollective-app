import merge from 'lodash/object/merge';
import {
  TRANSACTIONS_SUCCESS,
  TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
  APPROVE_TRANSACTION_REQUEST,
  APPROVE_TRANSACTION_SUCCESS,
  APPROVE_TRANSACTION_FAILURE
} from '../actions/transactions';

const defaults = {
  inProgress: false,
  error: {}
};

export default function transactions(state=defaults, action={}) {
  const { type } = action;

  switch (type) {

    case TRANSACTIONS_SUCCESS:
    case TRANSACTION_SUCCESS:
    case CREATE_TRANSACTION_SUCCESS:
      return merge({}, state, action.transactions);

    case CREATE_TRANSACTION_FAILURE:
      const error = action.error;
      return merge({}, state, { error });

    case APPROVE_TRANSACTION_REQUEST:
      return merge({}, state, { inProgress: true });

    case APPROVE_TRANSACTION_SUCCESS:
    case APPROVE_TRANSACTION_FAILURE:
      return merge({}, state, { inProgress: false });

    default:
      return state;
  }
}

