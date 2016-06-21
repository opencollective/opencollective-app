import expect from 'expect';
import reducer from '../../../frontend/src/reducers/expenses';
import * as constants from '../../../frontend/src/constants/expenses';

describe('expenses reducer', () => {

  it('should return the initial state', () => {
    const state = {1: {amount: 10}};
    expect(reducer(state, {})).toEqual(state);
  });

  it('should add one expenses', () => {
    const expenses = {
      2: {amount: 12}
    };
    const state = reducer({}, {
      type: constants.EXPENSE_SUCCESS,
      expenses
    });

    expect(state).toEqual(expenses);
  });

  it('should add multiple expenses', () => {
    const expenses = {
      2: {amount: 12},
      3: {amount: 15}
    };
    const state = reducer({}, {
      type: constants.EXPENSES_SUCCESS,
      expenses
    });

    expect(state).toEqual(expenses);
  });

  it('should create a expense', () => {
    const expenses = {
      1: {amount: 150, category: 'other'},
      3: {amount: 20, category: 'food'}
    };
    const state = reducer({}, {
      type: constants.CREATE_EXPENSE_SUCCESS,
      expenses
    });

    expect(state).toEqual(expenses);
  });

  describe('approve', () => {
    it('should be in progress after an APPROVE_EXPENSE_REQUEST', () => {
      const state = reducer({}, {
        type: constants.APPROVE_EXPENSE_REQUEST
      });

      expect(state).toEqual({ approveInProgress: true});
    });

    it('should not be in progress after an APPROVE_EXPENSE_SUCCESS', () => {
      const state = reducer({ approveInProgress: true }, {
        type: constants.APPROVE_EXPENSE_SUCCESS
      });

      expect(state).toEqual({ approveInProgress: false});
    });

    it('should not be in progress after an APPROVE_EXPENSE_FAILURE', () => {
      const state = reducer({ approveInProgress: true }, {
        type: constants.APPROVE_EXPENSE_FAILURE
      });

      expect(state).toEqual({ approveInProgress: false});
    });
  });

  describe('reject', () => {
    it('should be in progress after an REJECT_EXPENSE_REQUEST', () => {
      const state = reducer({}, {
        type: constants.REJECT_EXPENSE_REQUEST
      });

      expect(state).toEqual({ rejectInProgress: true});
    });

    it('should not be in progress after an REJECT_EXPENSE_SUCCESS', () => {
      const state = reducer({ rejectInProgress: true }, {
        type: constants.REJECT_EXPENSE_SUCCESS
      });

      expect(state).toEqual({ rejectInProgress: false});
    });

    it('should not be in progress after an REJECT_EXPENSE_FAILURE', () => {
      const state = reducer({ rejectInProgress: true }, {
        type: constants.REJECT_EXPENSE_FAILURE
      });

      expect(state).toEqual({ rejectInProgress: false});
    });
  });

  describe('pay', () => {
    it('should be in progress after an PAY_EXPENSE_REQUEST', () => {
      const state = reducer({}, {
        type: constants.PAY_EXPENSE_REQUEST
      });

      expect(state).toEqual({ payInProgress: true});
    });

    it('should not be in progress after an PAY_EXPENSE_SUCCESS', () => {
      const state = reducer({ payInProgress: true }, {
        type: constants.PAY_EXPENSE_SUCCESS
      });

      expect(state).toEqual({ payInProgress: false});
    });

    it('should not be in progress after an PAY_EXPENSE_FAILURE', () => {
      const state = reducer({ payInProgress: true }, {
        type: constants.PAY_EXPENSE_FAILURE
      });

      expect(state).toEqual({ payInProgress: false});
    });
  });

});
