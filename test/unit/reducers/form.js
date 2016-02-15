import expect from 'expect';
import reducer from '../../../frontend/src/reducers/form';
import * as constants from '../../../frontend/src/constants/form';

describe('form reducer', () => {

  describe('transaction', () => {

    it('should have default attributes', () => {
      const attributes = reducer().transaction.attributes;
      expect(attributes.amount).toEqual(undefined);
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
      expect(newState.transaction.attributes.amount).toEqual(undefined);
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

});
