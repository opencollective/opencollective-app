import expect from 'expect';
import reducer from '../../../frontend/src/reducers/users';
import * as constants from '../../../frontend/src/constants/users';

describe('users reducer', () => {

  it('should return the initial state', () => {
    const state = {1: {}};
    expect(reducer(state, {})).toEqual(state);
  });

  it('should add the groups to the user', () => {
    const groups = {
      1: {name: 'New York', balance: 9090}
    };
    const userid = 1;
    const state = reducer(undefined, {
      type: constants.USER_GROUPS_SUCCESS,
      groups,
      userid
    });

    expect(state).toEqual({
      [userid]: {groups},
      updateInProgress: false,
      cards: []
    });
  });

  it('should add the expenses to the user', () => {
    const expenses = {
      1: {amount: 10, category: 'other'},
      3: {amount: 200, category: 'food'}
    };
    const userid = 1;
    const state = reducer(undefined, {
      type: constants.USER_GROUP_AND_EXPENSES_SUCCESS,
      expenses,
      userid
    });

    expect(state).toEqual({
      [userid]: {expenses},
      updateInProgress: false,
      cards: []
    });
  });

  it('should add new users', () => {
    const users = {
      1: {name: 'bob'},
      updateInProgress: false,
      cards: []
    };
    const state = reducer(undefined, {
      type: constants.FETCH_USER_SUCCESS,
      users
    });

    expect(state).toEqual(users);
  });
});
