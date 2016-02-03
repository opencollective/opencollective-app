import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import ApproveButton from '../../../components/ApproveButton';
import ExportTransactionsButton from '../../../components/ExportTransactionsButton';

const {expect} = chai;
const renderer = TestUtils.createRenderer();

const createElement = (props) => {
  renderer.render(<ExportTransactionsButton {...props} />);
  return renderer.getRenderOutput();
};

chai.use(spies);

describe('ExportTransactionsButton component', () => {
  it('should not be displayed if user is not host', () => {
    const element = createElement({
      isHost: false
    });

    expect(element.props).to.deep.equal({});
  });

  it('should be displayed with a click handler if user is host', () => {
    const element = createElement({
      isHost: true,
      transactions: []
    });

    expect(element.props.className).to.equal('ExportTransactionsButton');
    expect(element.props.onClick.name).to.contain('exportTransactions');
  });
});
