import expect from 'expect';
import reducer from '../../reducers/form';
import * as constants from '../../constants/form';

describe('form reducer', () => {

  describe('transaction', () => {

    it('should have default attributes', () => {
      const attributes = reducer().transaction.attributes;
      expect(attributes.amount).toEqual(0);
      expect(attributes.tags).toExist();
      expect(attributes.description).toEqual('');
    });

    it('should reset the form', () => {
      const state = {
        transaction: {
          attributes: {
            amount: 9999
          }
        }
      };

      const newState = reducer(state, {
        type: constants.RESET_TRANSACTION_FORM
      });
      expect(newState.transaction.attributes.amount).toEqual(0);
    });

    it('should append new attributes to the form', () => {
      const description = 'Receipt';
      const state = reducer({}, {
        type: constants.APPEND_TRANSACTION_FORM,
        attributes: { description }
      });

      expect(state.transaction.attributes.description).toEqual(description);
    });

  });

  describe('login', () => {

    it('should have a default state', () => {
      expect(reducer().transaction.attributes).toExist();
    });

    it('should reset the form', () => {
      const state = {
        login: {
          attributes: {
            email: 'test@gmail.com'
          }
        }
      };

      const newState = reducer(state, {
        type: constants.RESET_LOGIN_FORM
      });
      expect(newState.login.attributes.email).toNotExist();
    });

    it('should append new attributes to the form', () => {
      const email = 'test@gmail.com';
      const state = reducer({}, {
        type: constants.APPEND_LOGIN_FORM,
        attributes: { email }
      });

      expect(state.login.attributes.email).toEqual(email);
    });

  });


});
