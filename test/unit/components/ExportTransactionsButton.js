import React from 'react';
import TestUtils from 'react-addons-test-utils';
//import ReactShallowRenderer from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import ApproveButton from '../../../components/ApproveButton';
import ExportTransactionsButton from '../../../components/ExportTransactionsButton';

const {expect} = chai;
const {
  createRenderer
  } = TestUtils;
const renderer = createRenderer();

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

  it('should be displayed if user is host', () => {
    const element = createElement({
      isHost: true,
      transactions: []
    });

    expect(element.props.className).to.equal('ExportTransactionsButton');
  });
});
