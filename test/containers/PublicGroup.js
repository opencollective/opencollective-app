import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';

import {
  PublicGroup,
  donateToGroup,
} from '../../containers/PublicGroup';

import {
  save
} from '../../components/PublicGroupSignup';

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
        fetchTransactions: () => Promise.resolve(),
        fetchUsers: () => {},
        notification: {},
        group: {},
        admin: {},
        expenses: [],
        donations: []
      });
      expect(handler).to.have.been.called();
  });

  it('should donate to the group', (done) => {
    const donate = chai.spy(() => Promise.resolve());
    const notify = chai.spy(() => Promise.resolve());
    const showAdditionalUserInfoForm = chai.spy(() => Promise.resolve());

    const props = {
      groupid: 1,
      donate,
      notify,
      showAdditionalUserInfoForm,
    };
    const token = {
      id: 'tok_17BNlt2eZvKYlo2CVoTcWs9D',
      email: 'test@gmail.com'
    };

    donateToGroup.call({props}, 10, token)
    .then(() => {
      expect(donate).to.have.been.called();
      expect(notify).to.not.have.been.called();
      expect(showAdditionalUserInfoForm).to.have.been.called();
      done();
    });
  });

  it('should donate with subscription to the group', (done) => {
    const token = {
      id: 'tok_17BNlt2eZvKYlo2CVoTcWs9D',
      email: 'test@gmail.com'
    };
    const donate = chai.spy((groupid, payment) => {
      expect(groupid).to.be.equal(1);
      expect(payment.interval).to.be.equal('month');
      expect(payment.stripeToken).to.be.equal(token.id);
      expect(payment.email).to.be.equal(token.email);
      expect(payment.amount).to.be.equal(10);
      return Promise.resolve();
    });
    const notify = chai.spy(() => Promise.resolve());
    const showAdditionalUserInfoForm = chai.spy(() => Promise.resolve());


    const props = {
      groupid: 1,
      donate,
      notify,
      showAdditionalUserInfoForm,
      interval: 'month'
    };

    donateToGroup.call({props}, 10, token)
    .then(() => {
      expect(donate).to.have.been.called();
      expect(notify).to.not.have.been.called();
      expect(showAdditionalUserInfoForm).to.have.been.called();
      done();
    });
  });

  it('should not donate with subscription to the group if interval is none', (done) => {
    const token = {
      id: 'tok_17BNlt2eZvKYlo2CVoTcWs9D',
      email: 'test@gmail.com'
    };
    const donate = chai.spy((groupid, payment) => {
      expect(groupid).to.be.equal(1);
      expect(payment.interval).to.not.be.ok;
      expect(payment.stripeToken).to.be.equal(token.id);
      expect(payment.email).to.be.equal(token.email);
      expect(payment.amount).to.be.equal(10);
      return Promise.resolve();
    });
    const notify = chai.spy(() => Promise.resolve());
    const showAdditionalUserInfoForm = chai.spy(() => Promise.resolve());

    const props = {
      groupid: 1,
      donate,
      notify,
      showAdditionalUserInfoForm,
      interval: 'none'
    };

    donateToGroup.call({props}, 10, token)
    .then(() => {
      expect(donate).to.have.been.called();
      expect(notify).to.not.have.been.called();
      expect(showAdditionalUserInfoForm).to.have.been.called();
      done();
    });
  });

  it('should save the user info', (done) => {
    const validateDonationProfile = chai.spy(() => Promise.resolve());
    const notify = chai.spy(() => Promise.resolve());
    const updateUser = chai.spy(() => Promise.resolve());
    const hideAdditionalUserInfoForm = chai.spy(() => Promise.resolve());
    const pushState = chai.spy((ctx, url) => {
      expect(url).to.be.equal('/public/groups/1/?status=thankyou')
    });

    const profileForm = {
      attributes: {
        name: 'john doe',
        website: 'http://www.opencollective.com',
        twitterHandle: 'asood123'
      }
    }
    const props = {
      users: {user: {id: 1}},
      groupid: 1,
      profileForm,
      validateDonationProfile,
      updateUser,
      hideAdditionalUserInfoForm,
      pushState,
      notify
    }
    save.call({props})
    .then(() => {
      expect(validateDonationProfile).to.have.been.called();
      expect(notify).to.not.have.been.called();
      expect(updateUser).to.have.been.called();
      expect(hideAdditionalUserInfoForm).to.have.been.called();
      expect(pushState).to.have.been.called();
      done();
    })
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
      fetchTransactions: () => Promise.resolve(),
      fetchUsers: () => {},
      resetNotifications: () => {},
      groupid: 1,
      group: {},
      notification,
      admin: {},
      expenses: [],
      donations: []
    }, 'Notification');

    expect(element.className).to.contain(notification.status);
    expect(element.innerHTML).to.contain(notification.message);
  });
});
