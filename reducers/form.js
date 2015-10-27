import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

import message from '../lib/error_message';
import tags from '../ui/tags';
import {
  RESET_TRANSACTION_FORM,
  APPEND_TRANSACTION_FORM,
  RESET_LOGIN_FORM,
  APPEND_LOGIN_FORM,
  VALIDATE_TRANSACTION_FAILURE,
  VALIDATE_LOGIN_FAILURE,
  RESET_TRANSACTION_FORM_ERROR
} from '../actions/form';

/**
 * New transaction form reducer
 */

const transactionInitialState = {
  defaults: { tags },
  attributes: {
    amount: 0,
    tags: [tags[0]],
    description: ''
  }
};

function transaction(state=transactionInitialState, action={}) {
  switch (action.type) {
    case RESET_TRANSACTION_FORM:
      return merge({}, transactionInitialState);

    case APPEND_TRANSACTION_FORM:
      return merge({}, state, { attributes: action.attributes });

    case VALIDATE_TRANSACTION_FAILURE:
      return merge({}, state, {
        error: {
          message: message(action)
        }
      });

    case RESET_TRANSACTION_FORM_ERROR:
      return merge({}, omit(state, 'error'));

    default:
      return state;
  }
}

/**
 * Login form reducer
 */

const loginInitialState = {
  attributes: {}
};

function login(state=loginInitialState, action={}) {
  switch (action.type) {
    case RESET_LOGIN_FORM:
      return merge({}, loginInitialState);

    case APPEND_LOGIN_FORM:
      return merge({}, state, { attributes: action.attributes });

    case VALIDATE_LOGIN_FAILURE:
      return merge({}, state, {
        error: {
          message: message(action)
        }
      });

    default:
      return state;
  }
}

export default combineReducers({
  transaction,
  login
});
