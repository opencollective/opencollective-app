import nock from 'nock';
import expect from 'expect';

import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/users';

import sendLink from '../../../../frontend/src/actions/users/send_reset_password_link';

describe('users actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('send reset password link', () => {
    const email = 'email@example.com';

    it('creates SEND_RESET_PASSWORD_LINK_SUCCESS if it is successful', (done) => {
      const json = { success: true };

      nock(env.API_ROOT)
        .post('/users/password/forgot')
        .reply(200, json);

      const store = mockStore({});
      store.dispatch(sendLink(email))
      .then(() => {
        const [request, success] = store.getActions();
        expect(request).toEqual({ type: constants.SEND_RESET_PASSWORD_LINK_REQUEST, email });
        expect(success).toEqual({ type: constants.SEND_RESET_PASSWORD_LINK_SUCCESS, email, json });
        done();
      })
      .catch(done);
    });

    it('creates SEND_RESET_PASSWORD_LINK_FAILURE if it fails', (done) => {
      nock(env.API_ROOT)
        .post('/users/password/forgot')
        .replyWithError('');

      const store = mockStore({});

      store.dispatch(sendLink(email))
      .catch(() => {
        const [request, failure] = store.getActions();
        expect(request).toEqual({ type: constants.SEND_RESET_PASSWORD_LINK_REQUEST, email});
        expect(failure.type).toEqual(constants.SEND_RESET_PASSWORD_LINK_FAILURE);
        expect(failure.error.message).toContain('request to http://localhost:3000/api/users/password/forgot failed');
        done();
      });
    });
  });

});
