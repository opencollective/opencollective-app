import expect from 'expect';
import {
  resetTransactionForm,
  appendTransactionForm,
  resetLoginForm,
  appendLoginForm,
} from '../../actions/form';
import * as constants from '../../constants/form';

describe('form actions', () => {

  it('should create an action to reset the transaction form', () => {
    expect(resetTransactionForm()).toEqual({
      type: constants.RESET_TRANSACTION_FORM,
    });
  });

  it('should create an action to append a fields to the transaction form', () => {
    const attributes = { amount: 0 };

    expect(appendTransactionForm(attributes)).toEqual({
      type: constants.APPEND_TRANSACTION_FORM,
      attributes
    });
  });

  it('should create an action to reset the login form', () => {
    expect(resetLoginForm()).toEqual({
      type: constants.RESET_LOGIN_FORM,
    });
  });

  it('should create an action to append a fields to the login form', () => {
    const attributes = { email: 'test@gmail.com' };

    expect(appendLoginForm(attributes)).toEqual({
      type: constants.APPEND_LOGIN_FORM,
      attributes
    });
  });
});
