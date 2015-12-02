import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';

import {
  PublicGroup,
  donateToGroup
} from '../../containers/PublicGroup';

const {expect} = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

const createElement = (props, className='PublicGroup') => {
  const rendered = renderIntoDocument(<PublicGroup {...props} />);
  return findRenderedDOMComponentWithClass(rendered, className);
};

chai.use(spies);

describe('PublicGroup container', () => {

  it('should fetch the group on mount', () => {
      const handler = chai.spy(() => Promise.resolve());
      createElement({
        fetchGroup: handler,
        groupid: 1,
        resetNotifications: () => {},
        group: {}
      });
      expect(handler).to.have.been.called();
  });

  it('should donate to the group', (done) => {
    const donate = chai.spy(() => Promise.resolve());
    const notify = chai.spy((type) => {
      expect(type).to.be.equal('success');
    });
    const props = {
      groupid: 1,
      donate,
      notify
    };
    const token = {
      id: 'tok_17BNlt2eZvKYlo2CVoTcWs9D',
      email: 'test@gmail.com'
    };

    donateToGroup.call({props}, 10, token)
    .then(() => {
      expect(donate).to.have.been.called();
      expect(notify).to.have.been.called();
      done();
    });
  });

  it('should send a notification if the donation fails', (done) => {
    const error = { message: 'Fail' };
    const donate = chai.spy(() => Promise.resolve({ error }));
    const notify = chai.spy((type) => {
      expect(type).to.be.equal('error');
    });
    const props = {
      groupid: 1,
      donate,
      notify
    };
    const token = {
      id: 'tok_17BNlt2eZvKYlo2CVoTcWs9D',
      email: 'test@gmail.com'
    };

    donateToGroup.call({props}, 10, token)
    .then(() => {
      expect(donate).to.have.been.called();
      expect(notify).to.have.been.called();
      done();
    });
  });

  it('should render a notification', () => {
    const notification = {
      status: 'error',
      message: 'Fail'
    };
    const element = createElement({
      fetchGroup: () => Promise.resolve(),
      resetNotifications: () => {},
      groupid: 1,
      group: {},
      notification
    }, 'Notification');

    expect(element.className).to.contain(notification.status);
    expect(element.innerHTML).to.contain(notification.message);
  });
});
