import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import TransactionForm from '../../components/TransactionForm';

const {expect} = chai;
const {
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  Simulate,
  renderIntoDocument
} = TestUtils;

chai.use(spies);

describe('TransactionForm component', () => {
  const noop = () => {};
  let resetTransactionForm = chai.spy(noop);
  let element;

  beforeEach(() => {
    const props = {
      transaction: { attributes: {} },
      tags: ['a', 'b'],
      resetTransactionForm,
    };

    const rendered = renderIntoDocument(<TransactionForm {...props} />);
    element = findRenderedDOMComponentWithClass(rendered, 'js-form');
  });

  it('should reset the form on mount', () => {
    expect(resetTransactionForm).to.have.been.called();
  });
});
