import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import { update, ExpenseEdit } from '../../../frontend/src/containers/ExpenseEdit';

const {expect} = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

import noop from '../helpers/noop';

const createElement = (props) => {
  const rendered = renderIntoDocument(<ExpenseEdit {...props} />);
  return findRenderedDOMComponentWithClass(rendered, 'TransactionForm');
};

chai.use(spies);

describe('ExpenseEdit container', () => {

  it('should reset form on mount', () => {
    const resetExpenseForm = chai.spy(noop);

    const expense = {
      attributes: {},
      error: {}
    };

    createElement({
      initialExpense: { amount: 10 },
      expense,
      tags: [],
      resetNotifications: noop,
      fetchExpense: noop,
      notification: {},
      fetchGroup: noop,
      group: {id: 1, currency: 'USD' },
      appendExpenseForm: noop,
      resetExpenseForm
    });

    expect(resetExpenseForm).to.have.been.called();
  });

  it('should set the amount in cents on update', () => {
    const amountText = 10;
    const validateExpense = chai.spy(expense => {
      expect(expense.amount).to.be.equal(amountText*100);
      return Promise.resolve();
    });

    const props = {
      validateExpense,
      updateExpense: noop,
      notify: noop
    };

    update.call({ props }, {
      attributes: { amountText }
    });

  });

});
