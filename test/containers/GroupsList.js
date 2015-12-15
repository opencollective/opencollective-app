import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';

import {
  GroupsList,
  mapStateToProps
} from '../../containers/GroupsList';

const { expect } = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

const createElement = (props, className = 'GroupsList') => {
  const rendered = renderIntoDocument(<GroupsList {...props} />);
  return findRenderedDOMComponentWithClass(rendered, className);
};

chai.use(spies);

describe('GroupsList container', () => {

  it('fetches user, transactions and cards on mount', () => {
    const fetchUserGroupsAndTransactions = chai.spy(() => Promise.resolve());
    const fetchCards = chai.spy(() => Promise.resolve());

    createElement({
      userid: 1,
      fetchUserGroupsAndTransactions,
      fetchCards,
      groups: [],
      query: {}
    });

    expect(fetchUserGroupsAndTransactions).to.have.been.called();
  });

  it('confirms the card if it has the preapproval key', () => {
    const query = {
      preapprovalKey: 'abc',
      approvalStatus: 'success'
    };

    const confirmPreapprovalKey = chai.spy((userid, preapprovalKey) => {
      expect(userid).to.be.equal(1);
      expect(preapprovalKey).to.be.equal(query.preapprovalKey);
    });

    createElement({
      userid: 1,
      fetchUserGroupsAndTransactions: () => Promise.resolve(),
      fetchCards: () => Promise.resolve(),
      confirmPreapprovalKey,
      groups: [],
      query
    });

    expect(confirmPreapprovalKey).to.have.been.called();
  });


  it('shows the paypal reminder if showPaypalReminder is true', () => {
    const query = {
      preapprovalKey: 'abc',
      approvalStatus: 'success'
    };
    const element = createElement({
      userid: 1,
      fetchUserGroupsAndTransactions: () => Promise.resolve(),
      fetchCards: () => Promise.resolve(),
      confirmPreapprovalKey: () => {},
      getPreapprovalKeyForUser: () => {},
      groups: [],
      showPaypalReminder: true,
      query
    }, 'Reminder');

    expect(element.innerHTML).to.contain('success');
  });

  it('shows the paypal reminder if showProfileReminder is true', () => {
    const query = {
      preapprovalKey: 'abc',
      approvalStatus: 'success'
    };
    const element = createElement({
      userid: 1,
      fetchUserGroupsAndTransactions: () => Promise.resolve(),
      fetchCards: () => Promise.resolve(),
      confirmPreapprovalKey: () => {},
      getPreapprovalKeyForUser: () => {},
      groups: [],
      showProfileReminder: true,
      query
    }, 'Reminder');

    expect(element.innerHTML).to.contain('profile page');
  });

  it('sets userIsAdmin to true if user is admin in group', () => {
    const users = {
      1: {
        groups: { 1: { role: 'admin'} },
        transactions: {}
      }
    };
    const state = mapStateToProps({
      users,
      session: { user: { id: 1 }},
      router: { location: { query: {} } }
    });

    expect(state.userIsAdmin).to.be.equal(true);
  });

  it('sets userIsAdmin to false if user is not admin in group', () => {
    const users = {
      1: {
        groups: { 1: { role: 'viewer'} },
        transactions: {}
      }
    };
    const state = mapStateToProps({
      users,
      session: { user: { id: 1 }},
      router: { location: { query: {} } }
    });

    expect(state.userIsAdmin).to.be.equal(false);
  });

  it('sets hasConfirmedCards to true if user has confirmed cards', () => {
    const users = {
      1: {
        cards: { 1: { confirmedAt: Date.now() } },
        groups: {},
        transactions: {}
      }
    };
    const state = mapStateToProps({
      users,
      session: { user: { id: 1 }},
      router: { location: { query: {} } }
    });

    expect(state.hasConfirmedCards).to.be.equal(true);
  });

  it('sets hasConfirmedCards to false if user has no confirmed cards', () => {
    const users = {
      1: {
        cards: { 1: { } },
        groups: {},
        transactions: {}
      }
    };
    const state = mapStateToProps({
      users,
      session: { user: { id: 1 }},
      router: { location: { query: {} } }
    });

    expect(state.hasConfirmedCards).to.be.equal(false);
  });

  it('sets showPaypalReminder to true if user has no confirmed cards and is not admin', () => {
    const users = {
      1: {
        cards: {},
        groups: { 1: { role: 'admin'} },
        transactions: {}
      }
    };
    const state = mapStateToProps({
      users,
      session: { user: { id: 1 }},
      router: { location: { query: {} } }
    });

    expect(state.showPaypalReminder).to.be.equal(true);
    expect(state.showProfileReminder).to.be.equal(false);
  });

  it('sets showProfileReminder to false if is not admin and has no paypal email', () => {
    const users = {
      1: {
        cards: {},
        groups: { 1: { role: 'viewer'} },
        transactions: {}
      }
    };
    const state = mapStateToProps({
      users,
      session: { user: { id: 1 }},
      router: { location: { query: {} } }
    });

    expect(state.showProfileReminder).to.be.equal(true);
    expect(state.showPaypalReminder).to.be.equal(false);
  });
});
