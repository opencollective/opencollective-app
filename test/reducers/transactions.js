import expect from 'expect';
import reducer from '../../reducers/transactions';
import {
  TRANSACTIONS_SUCCESS,
  TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  APPROVE_TRANSACTION_REQUEST,
  APPROVE_TRANSACTION_SUCCESS,
  APPROVE_TRANSACTION_FAILURE,
  REJECT_TRANSACTION_REQUEST,
  REJECT_TRANSACTION_SUCCESS,
  REJECT_TRANSACTION_FAILURE,
  PAY_TRANSACTION_REQUEST,
  PAY_TRANSACTION_SUCCESS,
  PAY_TRANSACTION_FAILURE,
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

  describe('approve', () => {
    it('should be in progress after an APPROVE_TRANSACTION_REQUEST', () => {
      const state = reducer({}, {
        type: APPROVE_TRANSACTION_REQUEST
      });

      expect(state).toEqual({ approveInProgress: true});
    });

    it('should not be in progress after an APPROVE_TRANSACTION_SUCCESS', () => {
      const state = reducer({ approveInProgress: true }, {
        type: APPROVE_TRANSACTION_SUCCESS
      });

      expect(state).toEqual({ approveInProgress: false});
    });

    it('should not be in progress after an APPROVE_TRANSACTION_FAILURE', () => {
      const state = reducer({ approveInProgress: true }, {
        type: APPROVE_TRANSACTION_FAILURE
      });

      expect(state).toEqual({ approveInProgress: false});
    });
  });

  describe('reject', () => {
    it('should be in progress after an REJECT_TRANSACTION_REQUEST', () => {
      const state = reducer({}, {
        type: REJECT_TRANSACTION_REQUEST
      });

      expect(state).toEqual({ rejectInProgress: true});
    });

    it('should not be in progress after an REJECT_TRANSACTION_SUCCESS', () => {
      const state = reducer({ rejectInProgress: true }, {
        type: REJECT_TRANSACTION_SUCCESS
      });

      expect(state).toEqual({ rejectInProgress: false});
    });

    it('should not be in progress after an REJECT_TRANSACTION_FAILURE', () => {
      const state = reducer({ rejectInProgress: true }, {
        type: REJECT_TRANSACTION_FAILURE
      });

      expect(state).toEqual({ rejectInProgress: false});
    });
  });

  describe('pay', () => {
    it('should be in progress after an PAY_TRANSACTION_REQUEST', () => {
      const state = reducer({}, {
        type: PAY_TRANSACTION_REQUEST
      });

      expect(state).toEqual({ payInProgress: true});
    });

    it('should not be in progress after an PAY_TRANSACTION_SUCCESS', () => {
      const state = reducer({ payInProgress: true }, {
        type: PAY_TRANSACTION_SUCCESS
      });

      expect(state).toEqual({ payInProgress: false});
    });

    it('should not be in progress after an PAY_TRANSACTION_FAILURE', () => {
      const state = reducer({ payInProgress: true }, {
        type: PAY_TRANSACTION_FAILURE
      });

      expect(state).toEqual({ payInProgress: false});
    });
  });

});
