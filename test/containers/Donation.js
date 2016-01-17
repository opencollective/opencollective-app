import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';

import { Donation, donate } from '../../containers/Donation';

const { expect } = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

const createElement = (props) => {
  const rendered = renderIntoDocument(<Donation {...props} />);
  return findRenderedDOMComponentWithClass(rendered, 'Donation');
};

chai.use(spies);

describe('Donation container', () => {

  it('should fetch user and group on mount', () => {
    const fetchUser = chai.spy(() => {});
    const fetchGroup = chai.spy(() => {});
    const fetchCards = chai.spy(() => {});

    createElement({
      fetchUser,
      fetchGroup,
      fetchCards,
      userCardsLabels: [],
      resetNotifications: () => {},
      notification: {},
      group: {},
      user: {}
    });

    expect(fetchUser).to.have.been.called();
    expect(fetchGroup).to.have.been.called();
  });

  it('should have a default description for the donation', (done) => {
    const email = 'test@email.com';
    const name = 'Rock';
    const props = {
      validateTransaction: validateTransaction,
      groupid: 1,
      amount: 1,
      group: {name},
      user: {email},
    };

    function validateTransaction(transaction) {
      expect(transaction.description)
        .to.be.equal(`Donation from ${email} to ${name}`);
      return Promise.resolve(done());
    }

    donate.apply({props}).then(done);
  });

  it('should show an error if there is a validationError', (done) => {
    const props = {
      validationError: {
        message: 'amount is missing'
      },
      group: {},
      user: {},
      validateTransaction: () => Promise.resolve(),
      notify: notify
    };

    function notify(type, message) {
      expect(type).to.be.equal('error');
      expect(message).to.be.equal(props.validationError.message);
      return Promise.resolve(done());
    }

    donate.apply({props});
  });

  it('should show an error if there is a serverError', (done) => {
    const props = {
      serverError: {
        message: '500, donkey in the db'
      },
      group: {},
      user: {},
      validateTransaction: () => Promise.resolve(),
      createTransaction: () => Promise.resolve(),
      notify: notify
    };

    function notify(type, message) {
      expect(type).to.be.equal('error');
      expect(message).to.be.equal(props.serverError.message);
      return Promise.resolve(done());
    }

    donate.apply({props}).catch(err => console.log(err.stack));
  });

  it('should redirect to GroupTransactions page if successful', (done) => {
    const props = {
      validateTransaction: () => Promise.resolve(),
      createTransaction: () => Promise.resolve(),
      pushState: pushState,
      groupid: 1,
      amount: 1,
      group: {},
      user: {},
    };

    function pushState(ctx, url) {
      expect(url)
        .to.be.equal(`/app/groups/${props.groupid}/transactions`);
      return Promise.resolve(done());
    }

    donate.apply({props});
  });
});
