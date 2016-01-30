import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

import errorDetail from '../lib/error_detail';
import * as constants from '../constants/form';

/**
 * Validate generic joi schema
 */

function schema(state={
  error: {}
}, action={}) {
  switch (action.type) {
    case constants.VALIDATE_SCHEMA_FAILURE:
      const { path, message } = errorDetail(action);

      return merge({}, omit(state, 'error'), {
        error: {
          [path]: true,
          message
        }
      });

    case constants.VALIDATE_SCHEMA_SUCCESS:
    case constants.VALIDATE_SCHEMA_FAILURE:
      return merge({}, omit(state, 'error'), { error: {} });

    default:
      return state;
  }
}

/**
 * New transaction form reducer
 */
const transactionInitialState = {
  attributes: {
    tags: [],
    description: '',
    paymentMethod: 'paypal',
    vat: null,
    createdAt: new Date()
  },
  error: {}
};

function transaction(state=transactionInitialState, action={}) {
  switch (action.type) {
    case constants.RESET_TRANSACTION_FORM:
      return merge({}, transactionInitialState);

    case constants.APPEND_TRANSACTION_FORM:
      return merge({}, state, { attributes: action.attributes });

    case constants.VALIDATE_SCHEMA_FAILURE:
    case constants.VALIDATE_TRANSACTION_FAILURE:
      const { path, message } = errorDetail(action);

      return merge({}, state, {
        error: {
          [path]: true,
          message
        }
      });

    case constants.VALIDATE_SCHEMA_FAILURE:
    case constants.VALIDATE_TRANSACTION_REQUEST:
      return merge({}, omit(state, 'error'), { error: {} });

    default:
      return state;
  }
}

/**
 * Donation form
 */

function donation(state={
  attributes: {
    amount: null,
    frequency: null
  }
}, action={}) {
  switch(action.type) {
    case constants.APPEND_DONATION_FORM:
      return merge({}, state, { attributes: action.attributes });
    default:
      return state;
  }
}

export default combineReducers({
  transaction,
  donation,
  schema
});
