import expect from 'expect';
import reducer from '../../reducers/transactions';
import {
  TRANSACTIONS_SUCCESS,
  TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_SUCCESS
} from '../../actions/transactions';

describe('transactions reducer', () => {

  it('should return the initial state', () => {
    const state = {1: {amount: 10}};
    expect(reducer(state, {})).toEqual(state);
  });

  it('should add one transactions', () => {
    const transactions = {
      2: {amount: 12}
    };
    const state = reducer({}, {
      type: TRANSACTION_SUCCESS,
      transactions
    });

    expect(state).toEqual(transactions);
  });

  it('should add multiple transactions', () => {
    const transactions = {
      2: {amount: 12},
      3: {amount: 15}
    };
    const state = reducer({}, {
      type: TRANSACTIONS_SUCCESS,
      transactions
    });

    expect(state).toEqual(transactions);
  });

  it('should create a transaction', () => {
    const transactions = {
      1: {amount: 15}
    };
    const state = reducer({}, {
      type: CREATE_TRANSACTION_SUCCESS,
      transactions
    });

    expect(state).toEqual(transactions);
  });
});
