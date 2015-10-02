import React from 'react/addons';
import chai from 'chai';
import spies from 'chai-spies';
import ApproveButton from '../../components/ApproveButton';

const {expect} = chai;
const {
  findRenderedDOMComponentWithTag,
  Simulate,
  renderIntoDocument
} = React.addons.TestUtils;

chai.use(spies);

describe('ApproveButton component', () => {

  let element;
  let handler = chai.spy(() => {});

  before(() => {
    const props = {
      transactionid: '1',
      groupid: '1',
      approveTransaction: handler
    };

    const rendered = renderIntoDocument(<ApproveButton {...props} />);
    element = findRenderedDOMComponentWithTag(rendered, 'div');
  });

  it('should call the action when clicked', () => {
    Simulate.click(element);
    expect(handler).to.have.been.called();
  });
});
