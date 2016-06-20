import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

import * as constants from '../constants/transactions';

const defaults = {
  approveInProgress: false,
  rejectInProgress: false,
  payInProgress: false,
  updateInProgress: false
};

export default function transactions(state=defaults, action={}) {
  switch (action.type) {

    case constants.CREATE_TRANSACTION_REQUEST:
      return merge({}, omit(state, 'error'));

    case constants.TRANSACTIONS_SUCCESS:
    case constants.TRANSACTION_SUCCESS:
    case constants.CREATE_TRANSACTION_SUCCESS:
    case constants.UPDATE_TRANSACTION_SUCCESS:
      var transactions = action.transactions;
      // multiply all transations values by 100
      // to be removed #postmigration
      Object.keys(transactions).map((value) =>
          transactions[value] = Object.assign({}, transactions[value], {amount: transactions[value].amount *= 100}));
      return merge({}, state, action.transactions);

    case constants.CREATE_TRANSACTION_FAILURE:
    case constants.UPDATE_TRANSACTION_FAILURE:
      const error = action.error;
      return merge({}, state, { error });

    case constants.UPDATE_TRANSACTION_REQUEST:
      return merge({}, state, { updateInProgress: true });

    case constants.UPDATE_TRANSACTION_SUCCESS:
    case constants.UPDATE_TRANSACTION_FAILURE:
      return merge({}, state, { updateInProgress: false });

    case constants.DELETE_TRANSACTION_SUCCESS:
      return merge({}, omit(state, action.transactionid));

    default:
      return state;
  }
}

