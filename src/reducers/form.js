import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

import dates from '../lib/dates';
import errorDetail from '../lib/error_detail';
import tags from '../ui/tags';
import {
  RESET_TRANSACTION_FORM,
  APPEND_TRANSACTION_FORM,
  RESET_LOGIN_FORM,
  APPEND_LOGIN_FORM,
  VALIDATE_TRANSACTION_FAILURE,
  VALIDATE_LOGIN_FAILURE,
  VALIDATE_TRANSACTION_REQUEST,
  VALIDATE_LOGIN_REQUEST,
  VALIDATE_PROFILE_REQUEST,
  VALIDATE_PROFILE_FAILURE,
  SET_EDIT_MODE_PROFILE,
  APPEND_PROFILE_FORM
} from '../constants/form';

/**
 * New transaction form reducer
 */

const transactionInitialState = {
  defaults: { tags },
  attributes: {
    amount: 0,
    tags: [tags[0]],
    description: '',
    createdAt: new Date()
  },
  error: {}
};

function transaction(state=transactionInitialState, action={}) {
  switch (action.type) {
    case RESET_TRANSACTION_FORM:
      return merge({}, transactionInitialState);

    case APPEND_TRANSACTION_FORM:
      return merge({}, state, { attributes: action.attributes });

    case VALIDATE_TRANSACTION_FAILURE:
      const { path, message } = errorDetail(action);

      return merge({}, state, {
        error: {
          [path]: true,
          message
        }
      });

    case VALIDATE_TRANSACTION_REQUEST:
      return merge({}, omit(state, 'error'), { error: {} });

    default:
      return state;
  }
}

/**
 * Login form reducer
 */

const loginInitialState = {
  attributes: {},
  error: {}
};

function login(state=loginInitialState, action={}) {
  switch (action.type) {
    case RESET_LOGIN_FORM:
      return merge({}, loginInitialState);

    case APPEND_LOGIN_FORM:
      return merge({}, state, { attributes: action.attributes });

    case VALIDATE_LOGIN_REQUEST:
      return merge({}, omit(state, 'error'), { error: {} });

    case VALIDATE_LOGIN_FAILURE:
      const { message, path } = errorDetail(action);

      return merge({}, state, {
        error: {
          [path]: true,
          message
        }
      });

    default:
      return state;
  }
}

/**
 * User profile form reducer
 */

const profileInitialState = {
  attributes: {},
  error: {},
  isEditMode: false
};

function profile(state=profileInitialState, action={}) {
  switch (action.type) {
    case SET_EDIT_MODE_PROFILE:
      return merge({}, state, { isEditMode: action.isEditMode });

    case APPEND_PROFILE_FORM:
      return merge({}, state, { attributes: action.attributes });

    case VALIDATE_PROFILE_REQUEST:
      return merge({}, omit(state, 'error'), { error: {} });

    case VALIDATE_PROFILE_FAILURE:
      const { path, message } = errorDetail(action);

      return merge({}, state, {
        error: {
          [path]: true,
          message
        }
      });
    default:
      return state;
  }
}

export default combineReducers({
  transaction,
  login,
  profile
});
