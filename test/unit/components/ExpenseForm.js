import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import ExpenseForm from '../../../frontend/src/components/ExpenseForm';

const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

chai.use(spies);

describe('ExpenseForm component', () => {
  const noop = () => {};
  const resetExpenseForm = chai.spy(noop);
  const appendExpenseForm = chai.spy(noop);

  beforeEach(() => {
    const props = {
      expense: { attributes: {}, error: {} },
      group: { currency: 'USD' },
      tags: ['a', 'b'],
      resetExpenseForm,
      appendExpenseForm,
      resetNotifications: () => {},
      notification: {}
    };

    const rendered = renderIntoDocument(<ExpenseForm {...props} />);
    findRenderedDOMComponentWithClass(rendered, 'js-form');
  });

  it('should reset the form on mount', () => {
    expect(resetExpenseForm).to.have.been.called();
  });
});
