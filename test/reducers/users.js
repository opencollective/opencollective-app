import expect from 'expect';
import reducer from '../../reducers/users';
import {
  USER_GROUPS_SUCCESS,
  USER_TRANSACTIONS_SUCCESS,
  USER_INFO_SUCCESS
} from '../../actions/users';

describe('users reducer', () => {

  it('should return the initial state', () => {
    const state = {1: {}};
    expect(reducer(state, {})).toEqual(state);
  });

  it('should add the group to the users', () => {
    const groups = {
      1: {name: 'New York'}
    };
    const state = reducer(undefined, {
      type: USER_GROUPS_SUCCESS,
      groups
    });

    expect(state).toEqual({groups});
  });

  it('should add the group to the users', () => {
    const transactions = {
      1: {amount: 10}
    };
    const state = reducer(undefined, {
      type: USER_TRANSACTIONS_SUCCESS,
      transactions
    });

    expect(state).toEqual({transactions});
  });

  it('should add the user info if available', () => {
    const info = {
      id: 1
    };
    const state = reducer(undefined, {
      type: USER_INFO_SUCCESS,
      info
    });

    expect(state).toEqual({info});
  });
});
