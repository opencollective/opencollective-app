import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import { Profile, save, cancel, getPreapprovalInfo } from '../../containers/Profile';

const {expect} = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

const createElement = (props) => {
  const rendered = renderIntoDocument(<Profile {...props} />);
  return findRenderedDOMComponentWithClass(rendered, 'Profile');
};

chai.use(spies);

describe('Profile container', () => {

  describe('on mount', function () {
    const fetchUser = chai.spy(() => Promise.resolve({}));
    const resetNotifications = chai.spy(() => Promise.resolve({}));
    const getPreapprovalDetails = chai.spy(() => Promise.resolve({}));
    const fetchCards = chai.spy(() => Promise.resolve({}));

    before(() => {
      createElement({
        fetchUser,
        resetNotifications,
        getPreapprovalDetails,
        fetchCards,
        fetchGroups: () => {},
        notification: {},
        userid: 1,
        user: {},
        preapprovalDetails: {},
        groups: []
      });
    });

    it('should fetch user data', () => {
      expect(fetchUser).to.have.been.called();
    });

    it('should reset the notifications', () => {
      expect(resetNotifications).to.have.been.called();
    });

    it('should fetch get the cards', () => {
      expect(fetchCards).to.have.been.called();
    });
  });

  it('should notify when validateProfile fails on saving', (done) => {
    const message = 'fail';
    const validateProfile = () => Promise.resolve({error: { message }});
    const notify = chai.spy(() => {});

    const props = {
      validateProfile,
      notify,
      form: { attributes: {} }
    };

    save.apply({props})
    .then(() => {
      expect(notify).to.have.been.called.with('error');
      done();
    });
  });


  it('should call updatePaypalEmail when validateProfile succeeds', (done) => {
    const validateProfile = () => Promise.resolve({});
    const fetchUser = () => Promise.resolve({});
    const setEditMode = () => Promise.resolve({});
    const updatePaypalEmail = chai.spy(() => Promise.resolve({}));

    const props = {
      validateProfile,
      fetchUser,
      setEditMode,
      updatePaypalEmail,
      user: { id: 1 },
      form: { attributes: {paypalEmail: 'test@gmail.com'} }
    };


    save.apply({props})
      .then(() => {
        expect(updatePaypalEmail).to.have.been.called.with(1);
        done();
      });
  });

  it('should setEditMode to false when canceling', () => {
    const setEditMode = chai.spy(() => {});

    cancel.apply({ props: { setEditMode }});

    expect(setEditMode).to.have.been.called.with(false);
  });

  it('should get preapproval details if the card has a token', (done) => {
    const getPreapprovalDetails = chai.spy((userid, token) => {
      expect(userid).to.be.equal(1);
      expect(token).to.be.equal('abc');
      return Promise.resolve();
    });

    const props = {
      userid: 1,
      getPreapprovalDetails,
      card: { token: 'abc' },
      fetchCards: () => Promise.resolve()
    };

    getPreapprovalInfo.call({props})
    .then(() => {
      expect(getPreapprovalDetails).to.have.been.called();
      done();
    });
  });

  it('should NOT get preapproval details if the card does not have a token', (done) => {
    const getPreapprovalDetails = chai.spy(() => {});

    const props = {
      userid: 1,
      getPreapprovalDetails,
      card: {},
      fetchCards: () => Promise.resolve()
    };

    getPreapprovalInfo.call({props})
    .then(() => {
      expect(getPreapprovalDetails).to.not.have.been.called();
      done();
    });
  });

});
