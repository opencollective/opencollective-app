import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import { createExpenseFn, ExpenseNew } from '../../../frontend/src/containers/ExpenseNew';
import noop from '../helpers/noop';

const {expect} = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

const createElement = (props) => {
  const rendered = renderIntoDocument(<ExpenseNew {...props} />);
  return findRenderedDOMComponentWithClass(rendered, 'TransactionForm');
};

chai.use(spies);

describe('ExpenseNew container', () => {

  it('should reset form on mount', () => {
      const handler = chai.spy(noop);
      const expense = {
        attributes: {},
        error: {}
      };

      createElement({
        expense,
        resetNotifications: noop,
        notification: {},
        fetchGroup: noop,
        group: {id: 1, currency: 'USD' },
        appendExpenseForm: handler,
        resetExpenseForm: handler
      });
      expect(handler).to.have.been.called();
  });

  it('should create an expense in cents', (done) => {
    const amountText = 10;
    const props = {
      group: {id: 1, currency: 'USD' },
      expense: {
        attributes: {amountText}
      },
      validateExpense: noop,
      createExpense
    };

    createExpenseFn.call({props}, {});

    function createExpense(groupid, expense) {
      expect(expense.amount).to.be.equal(amountText*100);
      done();
      return Promise.resolve();
    }
  });

});
