import nock from 'nock';
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

      const expected = [
        { type: constants.SEND_RESET_PASSWORD_LINK_REQUEST, email },
        { type: constants.SEND_RESET_PASSWORD_LINK_SUCCESS, email, json },
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(sendLink(email));
    });

    it('creates SEND_RESET_PASSWORD_LINK_FAILURE if it fails', (done) => {
      nock(env.API_ROOT)
        .post('/users/password/forgot')
        .replyWithError('');

      const expected = [
        { type: constants.SEND_RESET_PASSWORD_LINK_REQUEST, email },
        { type: constants.SEND_RESET_PASSWORD_LINK_FAILURE, error: new Error()}
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(sendLink(email));
    });
  });

});
