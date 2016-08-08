import expect from 'expect';
import reducer from '../../../frontend/src/reducers/form';
import * as constants from '../../../frontend/src/constants/form';

describe('form reducer', () => {

  describe('expense', () => {

    it('should have default attributes', () => {
      const attributes = reducer().expense.attributes;
      expect(attributes.amount).toEqual(undefined);
      expect(attributes.category).toEqual('');
      expect(attributes.title).toEqual('');
    });

    it('should reset the form', () => {
      const state = {
        expense: {
          attributes: {
            amount: 9999
          }
        }
      };

      const newState = reducer(state, {
        type: constants.RESET_EXPENSE_FORM
      });
      expect(newState.expense.attributes.amount).toEqual(undefined);
    });

    it('should append new attributes to the form', () => {
      const title = 'Receipt';
      const state = reducer({}, {
        type: constants.APPEND_EXPENSE_FORM,
        attributes: { title }
      });

      expect(state.expense.attributes.title).toEqual(title);
    });

  });

});
