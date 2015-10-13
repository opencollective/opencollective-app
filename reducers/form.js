import { combineReducers } from 'redux';
import merge from 'lodash/object/merge';
import {
  RESET_TRANSACTION_FORM,
  APPEND_TRANSACTION_FORM,
  RESET_LOGIN_FORM,
  APPEND_LOGIN_FORM
} from '../actions/form';

const tags = ['Food', 'Computer', 'Transport'];
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

    default:
      return state;
  }
}

const loginInitialState = {
  attributes: {}
};

function login(state=loginInitialState, action={}) {
  switch (action.type) {
    case RESET_LOGIN_FORM:
      return merge({}, loginInitialState);

    case APPEND_LOGIN_FORM:
      return merge({}, state, { attributes: action.attributes });

    default:
      return state;
  }
}

export default combineReducers({
  transaction,
  login
});
