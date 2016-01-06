import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

import errorDetail from '../lib/error_detail';
import * as constants from '../constants/form';

/**
 * New transaction form reducer
 */
const transactionInitialState = {
  attributes: {
    amount: 0,
    tags: [],
    description: '',
    paymentMethod: 'paypal',
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

    case constants.VALIDATE_TRANSACTION_FAILURE:
      const { path, message } = errorDetail(action);

      return merge({}, state, {
        error: {
          [path]: true,
          message
        }
      });

    case constants.VALIDATE_TRANSACTION_REQUEST:
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
    case constants.RESET_LOGIN_FORM:
      return merge({}, loginInitialState);

    case constants.APPEND_LOGIN_FORM:
      return merge({}, state, { attributes: action.attributes });

    case constants.VALIDATE_LOGIN_REQUEST:
      return merge({}, omit(state, 'error'), { error: {} });

    case constants.VALIDATE_LOGIN_FAILURE:
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
    case constants.SET_EDIT_MODE_PROFILE:
      if (!action.isEditMode) {
        return merge({}, profileInitialState, { isEditMode: action.isEditMode });
      }
      return merge({}, state, { isEditMode: action.isEditMode });

    case constants.APPEND_PROFILE_FORM:
      return merge({}, state, { attributes: action.attributes });

    case constants.VALIDATE_PROFILE_REQUEST:
      return merge({}, omit(state, 'error'), { error: {} });

    case constants.VALIDATE_PROFILE_FAILURE:
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

/**
 * Donation form
 */

function donation(state={
  isCustomMode: true,
  attributes: {
    interval: 'none'
  }
}, action={}) {
  switch(action.type) {
    case constants.APPEND_DONATION_FORM:
      return merge({}, state, { attributes: action.attributes });
    case constants.SET_DONATION_CUSTOM:
      return merge({}, state, {
        isCustomMode: action.isCustomMode,
        attributes: {
          amount: 0
        }
      });
    default:
      return state;
  }
}

export default combineReducers({
  transaction,
  login,
  profile,
  donation
});
