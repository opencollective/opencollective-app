import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

import {
  TRANSACTIONS_SUCCESS,
  TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
  APPROVE_TRANSACTION_REQUEST,
  APPROVE_TRANSACTION_SUCCESS,
  APPROVE_TRANSACTION_FAILURE,
  REJECT_TRANSACTION_REQUEST,
  REJECT_TRANSACTION_SUCCESS,
  REJECT_TRANSACTION_FAILURE,
  PAY_TRANSACTION_REQUEST,
  PAY_TRANSACTION_SUCCESS,
  PAY_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_REQUEST
} from '../actions/transactions';

const defaults = {
  approveInProgress: false,
  rejectInProgress: false,
  payInProgress: false
};

export default function transactions(state=defaults, action={}) {
  switch (action.type) {

    case CREATE_TRANSACTION_REQUEST:
      return merge({}, omit(state, 'error'));

    case TRANSACTIONS_SUCCESS:
    case TRANSACTION_SUCCESS:
    case CREATE_TRANSACTION_SUCCESS:
      return merge({}, state, action.transactions);

    case CREATE_TRANSACTION_FAILURE:
      const error = action.error;
      return merge({}, state, { error });

    case APPROVE_TRANSACTION_REQUEST:
      return merge({}, state, { approveInProgress: true });

    case APPROVE_TRANSACTION_SUCCESS:
    case APPROVE_TRANSACTION_FAILURE:
      return merge({}, state, { approveInProgress: false });

    case REJECT_TRANSACTION_REQUEST:
      return merge({}, state, { rejectInProgress: true });

    case REJECT_TRANSACTION_SUCCESS:
    case REJECT_TRANSACTION_FAILURE:
      return merge({}, state, { rejectInProgress: false });

    case PAY_TRANSACTION_REQUEST:
      return merge({}, state, { payInProgress: true });

    case PAY_TRANSACTION_SUCCESS:
    case PAY_TRANSACTION_FAILURE:
      return merge({}, state, { payInProgress: false });

    default:
      return state;
  }
}

