import merge from 'lodash/object/merge';

export default function entities(state = { groups: {}, transactions: {} }, action) {
  if (action.response && action.response) {
    return merge({}, state, action.response);
  }

  return state;
}
