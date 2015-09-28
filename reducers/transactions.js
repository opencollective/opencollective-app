import { RECEIVE_TRANSACTIONS } from '../actions';

const initialState = [];

export default function transactions(state = initialState, action) {

  switch(action.type) {

    case RECEIVE_TRANSACTIONS:
      return action.transactions;

    default:
      return state;
  }
}

