import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import RejectButton from '../../components/RejectButton';

const {expect} = chai;
const {
  findRenderedDOMComponentWithTag,
  Simulate,
  renderIntoDocument
} = TestUtils;

chai.use(spies);

describe('RejectButton component', () => {

  let element;
  let handler = chai.spy(() => {});

  before(() => {
    const props = {
      transactionid: '1',
      groupid: '1',
      rejectTransaction: handler
    };

    const rendered = renderIntoDocument(<RejectButton {...props} />);
    element = findRenderedDOMComponentWithTag(rendered, 'div');
  });

  it('should call the action when clicked', () => {
    Simulate.click(element);
    expect(handler).to.have.been.called();
  });
});
