import extend from 'lodash/object/extend';
import { TRANSACTIONS_SUCCESS, TRANSACTION_SUCCESS } from '../actions/transactions';

const initialState = {};

export default function transactions(state = initialState, action) {

  switch (action.type) {

    case TRANSACTIONS_SUCCESS:
    case TRANSACTION_SUCCESS:
      const data = action.response.transactions;
      return extend({}, state.transactions, data);

    default:
      return state;
  }
}

