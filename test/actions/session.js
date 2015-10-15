import expect from 'expect';
import nock from 'nock';
import jwt from 'jwt-simple';
import env from '../../lib/env';
import mockStore from '../helpers/mockStore';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  DECODE_JWT_SUCCESS,
  DECODE_JWT_FAILURE,
  login,
  decodeJWT,
} from '../../actions/session';

describe('session actions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates LOGIN_SUCCESS if it successfully logs in', (done) => {
    const email = 'test@gmail.com';
    const info = { id: 1, email };
    const accessToken = jwt.encode(info, 'aaa');
    const refreshToken = '123';
    const response = {
      access_token: accessToken,
      refresh_token: refreshToken
    };

    nock(env.API_ROOT)
      .post('/authenticate')
      .reply(200, response);

    const expected = [
      { type: LOGIN_REQUEST, email },
      { type: LOGIN_SUCCESS, json: response },
      { type: DECODE_JWT_SUCCESS, info }
    ];
    const store = mockStore({}, expected, done);
    store.dispatch(login({email}));

  });

  it('creates LOGIN_FAILURE if it fails to log in', (done) => {
    const email = 'test@gmail.com';

    nock(env.API_ROOT)
      .post('/authenticate')
      .replyWithError('Wrong stuff');

      const expected = [
        { type: LOGIN_REQUEST, email },
        { type: LOGIN_FAILURE, error: {} }
      ];
      const store = mockStore({}, expected, done);
      store.dispatch(login({email}));
  });

  it('creates DECODE_JWT_SUCCESS if it decodes a JWT', () => {
    const info = { id: 1 };
    const accessToken = jwt.encode(info, 'aaa');

    localStorage.setItem('accessToken', accessToken);

    expect(decodeJWT()).toEqual({
      type: DECODE_JWT_SUCCESS,
      info
    });
  });

  it('creates DECODE_JWT_FAILURE if it fails to decode a JWT', () => {
    localStorage.setItem('accessToken', 'lol');

    expect(decodeJWT()).toEqual({
      type: DECODE_JWT_FAILURE,
      redirectTo: '/login'
    });
  });

  it('creates DECODE_JWT_FAILURE if the JWT does not contain an id', () => {
    localStorage.setItem('accessToken', jwt.encode({ a: 'b'}, 'aaa'));

    expect(decodeJWT()).toEqual({
      type: DECODE_JWT_FAILURE,
      redirectTo: '/login'
    });
  });
});
