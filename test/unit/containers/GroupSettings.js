import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';

import noop from '../helpers/noop';

import {
  GroupSettings,
} from '../../../frontend/src/containers/GroupSettings';

const { expect } = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

const createElement = (props, className = 'GroupSettings') => {
  const rendered = renderIntoDocument(<GroupSettings {...props} />);
  return findRenderedDOMComponentWithClass(rendered, className);
};

chai.use(spies);

describe('GroupSettings container', () => {

  it('fetches group', () => {
    const fetchGroup = chai.spy(noop);

    createElement({
      error: {},
      updated: {},
      groupid: 1,
      group: {},
      fetchGroup,
      resetNotifications: noop,
      notification: {}
    });

    expect(fetchGroup).to.have.been.called();
  });

});
