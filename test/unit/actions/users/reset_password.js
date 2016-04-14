import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/users';

import resetPassword from '../../../../frontend/src/actions/users/reset_password';

describe('users actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('reset password', () => {
    const userToken = '123';
    const resetToken = 'abc';
    const password = 'ilovecake';

    it('creates RESET_PASSWORD_SUCCESS if it is successful', (done) => {
      const json = { success: true };

      nock(env.API_ROOT)
        .post(`/users/password/reset/${userToken}/${resetToken}`, {
          password,
          passwordConfirmation: password
        })
        .reply(200, json);

      const store = mockStore({});

      store.dispatch(resetPassword(userToken, resetToken, password))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.RESET_PASSWORD_REQUEST, userToken, resetToken, password });
          expect(success).toEqual({ type: constants.RESET_PASSWORD_SUCCESS, userToken, resetToken, password, json });
          done();
        })
        .catch(done)
    });

    it('creates RESET_PASSWORD_FAILURE if it fails', (done) => {
      nock(env.API_ROOT)
        .post(`/users/password/reset/${userToken}/${resetToken}`, {
          password,
          passwordConfirmation: password
        })
        .replyWithError('');

      const store = mockStore({});

      store.dispatch(resetPassword(userToken, resetToken, password))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.RESET_PASSWORD_REQUEST, userToken, resetToken, password });
          expect(failure.type).toEqual(constants.RESET_PASSWORD_FAILURE);
          expect(failure.userToken).toEqual(userToken);
          expect(failure.resetToken).toEqual(resetToken);
          expect(failure.password).toEqual(password);
          expect(failure.error.message).toContain('request to http://localhost:3000/api/users/password/reset/123/abc failed');
          done();
        })
    });
  });

});
