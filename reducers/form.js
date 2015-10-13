import merge from 'lodash/object/merge';
import { RESET_TRANSACTION_FORM, APPEND_TRANSACTION_FORM } from '../actions/form';

const defaultTags = ['Food', 'Computer', 'Transport'];
const initialState = {
  transaction: {
    defaultTags,
    attributes: {
      amount: 0,
      tags: [defaultTags[0]],
      description: ''
    }
  }
};

export default function form(state=initialState, action={}) {
  switch (action.type) {

    case RESET_TRANSACTION_FORM:
      return merge({}, initialState);

    case APPEND_TRANSACTION_FORM:
      const attributes = {
        transaction: { attributes: action.attributes }
      };
      return merge({}, state, attributes);

    default:
      return state;
  }
}

