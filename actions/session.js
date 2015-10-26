import jwtDecode from 'jwt-decode';
import { auth } from '../lib/api';

/**
 * Constants
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const DECODE_JWT_SUCCESS = 'DECODE_JWT_SUCCESS';
export const DECODE_JWT_FAILURE = 'DECODE_JWT_FAILURE';

/**
 * Authenticate user
 */

export function login({email, password}) {
  return dispatch => {
    dispatch(loginRequest(email));
    return auth({
      email,
      password
    })
    .then(json => dispatch(loginSuccess(json)))
    .then(json => dispatch(decodeJWT(json)))
    .catch(err => dispatch(loginFailure(err)));
  };
}

function loginRequest(email) {
  return {
    type: LOGIN_REQUEST,
    email
  };
}

function loginSuccess(json) {
  localStorage.setItem('accessToken', json.access_token);
  localStorage.setItem('refreshToken', json.refresh_token);

  return {
    type: LOGIN_SUCCESS,
    json,
  };
}

function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

/**
 * Load info from JWT if it exists
 */

export function decodeJWT() {

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return decodeJWTFailure();
  }

  let json = {};
  try {
    // This library doesn't have validation
    json = jwtDecode(accessToken);
  } catch (e) {
    decodeJWTFailure();
  }

  return json.id ? decodeJWTSuccess(json) : decodeJWTFailure();
}

function decodeJWTFailure() {
  return {
    type: DECODE_JWT_FAILURE,
    redirectTo: '/login'
  };
}

function decodeJWTSuccess(json) {
  return {
    type: DECODE_JWT_SUCCESS,
    info: json,
  };
}
