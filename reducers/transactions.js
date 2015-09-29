import extend from 'lodash/object/extend';
import { RECEIVE_TRANSACTIONS } from '../actions/transactions';

const initialState = {};

export default function transactions(state = initialState, action) {

  switch(action.type) {

    case RECEIVE_TRANSACTIONS:
      const data = action.response.transactions;
      return extend({}, state.transactions, data);

    default:
      return state;
  }
}

