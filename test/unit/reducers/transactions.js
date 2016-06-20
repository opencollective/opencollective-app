import expect from 'expect';
import reducer from '../../../frontend/src/reducers/transactions';
import * as constants from '../../../frontend/src/constants/transactions';

describe('transactions reducer', () => {

  it('should return the initial state', () => {
    const state = {1: {amount: 10}};
    expect(reducer(state, {})).toEqual(state);
  });

  it('should add one transactions', () => {
    const transactions = {
      2: {amount: 12}
    };
    const finalTransactions = {
      2: {amount: 1200}
    };
    const state = reducer({}, {
      type: constants.TRANSACTION_SUCCESS,
      transactions
    });

    expect(state).toEqual(finalTransactions);
  });

  it('should add multiple transactions', () => {
    const transactions = {
      2: {amount: 12},
      3: {amount: 15}
    };
    const finalTransactions = {
      2: {amount: 1200},
      3: {amount: 1500}
    };
    const state = reducer({}, {
      type: constants.TRANSACTIONS_SUCCESS,
      transactions
    });

    expect(state).toEqual(finalTransactions);
  });

  it('should create a transaction', () => {
    const transactions = {
      1: {amount: 15}
    };
    const finalTransactions = {
      1: {amount: 1500}
    };
    const state = reducer({}, {
      type: constants.CREATE_TRANSACTION_SUCCESS,
      transactions
    });

    expect(state).toEqual(finalTransactions);
  });

});
