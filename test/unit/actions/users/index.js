import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/users';

import getPreapprovalKeyForUser from '../../../../frontend/src/actions/users/get_preapproval_key';
import confirmPreapprovalKey from '../../../../frontend/src/actions/users/confirm_preapproval_key';
import fetchUserIfNeeded from '../../../../frontend/src/actions/users/fetch_by_id_cached';
import fetchUserGroups from '../../../../frontend/src/actions/users/fetch_groups';
import fetchCards from '../../../../frontend/src/actions/users/fetch_cards';
import updatePaypalEmail from '../../../../frontend/src/actions/users/update_paypal_email';

describe('users actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('preapproval per user', () => {

    it('creates GET_APPROVAL_KEY_FOR_USER_SUCCESS if it is successful', (done) => {
      const userid = 1;
      const json = { preapprovalKey: 'abc' };
      nock(env.API_ROOT)
        .get(`/users/${userid}/paypal/preapproval`)
        .query(true) // match all query params
        .reply(200, json);

      const store = mockStore({});

      store.dispatch(getPreapprovalKeyForUser(userid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.GET_APPROVAL_KEY_FOR_USER_REQUEST, userid });
          expect(success).toEqual({ type: constants.GET_APPROVAL_KEY_FOR_USER_SUCCESS, userid, json });
          done();
        })
        .catch(done)
    });

    it('creates GET_APPROVAL_KEY_FOR_USER_FAILURE if it fails', (done) => {
      const userid = 1;

      nock(env.API_ROOT)
        .get(`/users/${userid}/paypal/preapproval`)
        .query(true) // match all query params
        .replyWithError('');

      const store = mockStore({});

      store.dispatch(getPreapprovalKeyForUser(userid))
        .then(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.GET_APPROVAL_KEY_FOR_USER_REQUEST, userid });
          expect(failure.type).toEqual(constants.GET_APPROVAL_KEY_FOR_USER_FAILURE);
          expect(failure.error.message).toContain(
            //'request to http://localhost:3000/api/users/1/paypal/preapproval?cancelUrl=about%3A%2F%2Fblank%3FapprovalStatus%3Dcancel&maxTotalAmountOfAllPayments=2000&returnUrl=about%3A%2F%2Fblank%3FapprovalStatus%3Dsuccess%26preapprovalKey%3D%24%7BpreapprovalKey%7D failed');
            'request to http://localhost:3000/api/users/1/paypal/preapproval?cancelUrl=about%3A%2F%2Fblank%2F%3FapprovalStatus%3Dcancel&maxTotalAmountOfAllPayments=2000&returnUrl=about%3A%2F%2Fblank%2F%3FapprovalStatus%3Dsuccess%26preapprovalKey%3D%24%7BpreapprovalKey%7D failed');
          done();
        })
        .catch(done)
    });
  });

 describe('confirm preapproval per user', () => {

    it('creates CONFIRM_APPROVAL_KEY_SUCCESS if it is successful', (done) => {
      const userid = 1;
      const preapprovalKey = 'abc';
      const json = { id: 3 };

      nock(env.API_ROOT)
        .post(`/users/${userid}/paypal/preapproval/${preapprovalKey}`)
        .reply(200, json);

      const store = mockStore({});

      store.dispatch(confirmPreapprovalKey(userid, preapprovalKey))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.CONFIRM_APPROVAL_KEY_REQUEST, userid, preapprovalKey });
          expect(success).toEqual({ type: constants.CONFIRM_APPROVAL_KEY_SUCCESS, userid, preapprovalKey, json });
          done();
        })
        .catch(done)
    });

    it('creates CONFIRM_APPROVAL_KEY_FAILURE if it fails', (done) => {
      const userid = 1;
      const preapprovalKey = 'abc';

      nock(env.API_ROOT)
        .post(`/users/${userid}/paypal/preapproval/${preapprovalKey}`)
        .replyWithError('');

      const store = mockStore({});

      store.dispatch(confirmPreapprovalKey(userid, preapprovalKey))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.CONFIRM_APPROVAL_KEY_REQUEST, userid, preapprovalKey });
          expect(failure.type).toEqual(constants.CONFIRM_APPROVAL_KEY_FAILURE);
          expect(failure.error.message).toContain(
            //'request to http://localhost:3000/api/users/1/paypal/preapproval?cancelUrl=about%3A%2F%2Fblank%3FapprovalStatus%3Dcancel&maxTotalAmountOfAllPayments=2000&returnUrl=about%3A%2F%2Fblank%3FapprovalStatus%3Dsuccess%26preapprovalKey%3D%24%7BpreapprovalKey%7D failed'
            'request to http://localhost:3000/api/users/1/paypal/preapproval/abc failed');
          done();
        })
    });
  });

  describe('fetch user if needed', () => {

    it('should not fetch if the user is already in the store', (done) => {
      const user = { id: 1 };
      const store = mockStore({
        users: {
          [user.id]: user
        }
      });

      const actual = store.dispatch(fetchUserIfNeeded(user.id));
      expect(actual).toEqual({ type: constants.FETCH_USER_FROM_STATE, user });
      done();
    });

    it('should fetch the user if it is not in the state', (done) => {
      const id = 1;
      const user = { id };
      const users = { [id]: user };

      nock(env.API_ROOT)
        .get(`/users/${id}`)
        .reply(200, user);

      const store = mockStore({ users: {} });

      store.dispatch(fetchUserIfNeeded(user.id))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.FETCH_USER_REQUEST, id: id });
          expect(success).toEqual({ type: constants.FETCH_USER_SUCCESS, id: id, users });
          done();
        })
        .catch(done)
    });

    it('creates FETCH_USER_FAILURE if it fails', (done) => {
      const id = 1;

      nock(env.API_ROOT)
        .get(`/users/${id}`)
        .replyWithError('');

      const store = mockStore({ users: {} });

      store.dispatch(fetchUserIfNeeded(id))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.FETCH_USER_REQUEST, id: id });
          expect(failure.type).toEqual(constants.FETCH_USER_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3000/api/users/1 failed');
          done();
        })
    });
  });

  describe('fetch user groups', () => {

    it('creates USER_GROUPS_SUCCESS if it successfully fetches groups', (done) => {
      const userid = 1;
      const reponse = [
        { id: 2 },
        { id: 3 }
      ];
      const groups = {
        2: { id: 2 },
        3: { id: 3 }
      };

      nock(env.API_ROOT)
        .get(`/users/${userid}/groups`)
        .query(true) // match all query params
        .reply(200, reponse);

      const store = mockStore({});

      store.dispatch(fetchUserGroups(userid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.USER_GROUPS_REQUEST, userid });
          expect(success).toEqual({ type: constants.USER_GROUPS_SUCCESS, userid, groups });
          done();
        })
        .catch(done)
    });

    it('creates USER_GROUPS_FAILURE if it fails', (done) => {
      const userid = 1;

      nock(env.API_ROOT)
        .get(`/users/${userid}/groups`)
        .replyWithError('');

      const store = mockStore({});

      store.dispatch(fetchUserGroups(userid))
        .then(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.USER_GROUPS_REQUEST, userid });
          expect(failure.type).toEqual(constants.USER_GROUPS_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3000/api/users/1/groups?include=usergroup.role failed');
          done();
        })
        .catch(done)
    });
  });

  describe('update paypal email', () => {

    it('creates UPDATE_PAYPAL_EMAIL_SUCCESS if it successfully updates email', (done) => {
      const userid = 1;
      const paypalEmail = 'paypal@email.com';
      const response = {
        id: userid,
        paypalEmail
      };

      nock(env.API_ROOT)
        .put(`/users/${userid}/paypalemail`, { paypalEmail })
        .reply(200, response);

      const store = mockStore({});

      store.dispatch(updatePaypalEmail(userid, paypalEmail))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({
            type: constants.UPDATE_PAYPAL_EMAIL_REQUEST,
            userid,
            paypalEmail
          });
          expect(success).toEqual({
            type: constants.UPDATE_PAYPAL_EMAIL_SUCCESS,
            userid,
            paypalEmail,
            json: response
          });
          done();
        })
        .catch(done)
    });

    it('creates UPDATE_PAYPAL_EMAIL_FAILURE if it fails', (done) => {
      const userid = 1;
      const paypalEmail = 'paypal@email.com';

      nock(env.API_ROOT)
        .put(`/users/${userid}/paypalemail`, { paypalEmail })
        .replyWithError('');

      const store = mockStore({});

      store.dispatch(updatePaypalEmail(userid, paypalEmail))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.UPDATE_PAYPAL_EMAIL_REQUEST, userid, paypalEmail });
          expect(failure.type).toEqual(constants.UPDATE_PAYPAL_EMAIL_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3000/api/users/1/paypalemail failed');
          done();
        })
    });
  });

  describe('fetch user cards', () => {

    it('creates USER_CARDS_SUCCESS if it successfully fetches cards', (done) => {
      const userid = 1;
      const reponse = [
        { id: 2 },
        { id: 3 }
      ];
      const cards = {
        2: { id: 2 },
        3: { id: 3 }
      };

      nock(env.API_ROOT)
        .get(`/users/${userid}/cards`)
        .reply(200, reponse);

      const store = mockStore({});

      store.dispatch(fetchCards(userid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.USER_CARDS_REQUEST, userid });
          expect(success).toEqual({ type: constants.USER_CARDS_SUCCESS, userid, cards });
          done();
        })
        .catch(done)
    });

    it('creates USER_CARDS_FAILURE if it fails', (done) => {
      const userid = 1;

      nock(env.API_ROOT)
        .get(`/users/${userid}/cards`)
        .replyWithError('');

      const store = mockStore({});

      store.dispatch(fetchCards(userid))
        .then(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.USER_CARDS_REQUEST, userid });
          expect(failure.type).toEqual(constants.USER_CARDS_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3000/api/users/1/cards failed');
          done();
        })
        .catch(done)
    });
  });
});
