import { combineReducers } from 'redux';
import { RECEIVE_GROUP } from '../actions';

function groups(state = [], action) {
  switch (action.type) {
  case RECEIVE_GROUP:
    return [action.group];
  default:
    return state;
  }
}

function transactions(state = [], action) {
  switch (action.type) {
  default:
    return state;
  }
}

const reducers = combineReducers({
  groups,
  transactions
});

export default reducers;
