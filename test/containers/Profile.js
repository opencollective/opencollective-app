import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';
import { Profile, save, cancel } from '../../containers/Profile';

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

  it('should fetch user data on mount', () => {
      const handler = chai.spy(() => {});
      const element = createElement({
        fetchUser: handler,
        resetNotifications: () => {},
        userid: 1,
        user: {}
      });
      expect(handler).to.have.been.called();
  });

  it('should fetch reset notifications on mount', () => {
      const handler = chai.spy(() => {});
      const element = createElement({
        fetchUser: () => {},
        resetNotifications: handler,
        userid: 1,
        user: {}
      });
      expect(handler).to.have.been.called();
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
      form: { attributes: {} }
    };

    save.apply({props})
    .then(() => {
      expect(updatePaypalEmail).to.have.been.called.with(1);
      done();
    });
  });

  it('should setEditMode to false when canceling', () => {
    const setEditMode = chai.spy(() => {});

    const props = {
      setEditMode
    };

    cancel.apply({props});

    expect(setEditMode).to.have.been.called.with(false);
  });

});
