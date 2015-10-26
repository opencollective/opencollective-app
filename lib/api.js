import fetch from 'isomorphic-fetch';
import { normalize } from 'normalizr';
import extend from 'lodash/object/extend';
import env from './env';

const API_ROOT = env.API_ROOT;

/**
 * Get request
 */

export function get(endpoint, schema) {
  return fetch(url(endpoint), {headers: headers()})
    .then(checkStatus)
    .then((json={}) => normalize(json, schema).entities);
}

/**
 * POST json request
 */

export function postJSON(endpoint, body) {
  return fetch(url(endpoint), {
    method: 'post',
    headers: headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  })
  .then(checkStatus);
}

/**
 * Auth request without tokens
 */

export function auth(body) {

  return fetch(url('authenticate'), {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(checkStatus);
}

/**
 * POST request
 */

export function post(endpoint, body) {
  return fetch(url(endpoint), {
    headers: headers(),
    method: 'post',
    body,
  })
  .then(checkStatus);
}

function url(endpoint) {
  return (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
}

/**
 * The Promise returned from fetch() won't reject on HTTP error status. We
 * need to throw an error ourselves.
 */

function checkStatus(response) {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response.json();
  } else if (status === 401) {
    /**
     * This is a hack until we properly manage all the error codes with the actions
     */

    window.location = '/login';
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function headers(obj) {
  const accessToken = localStorage.getItem('accessToken');
  return extend({
    Authorization: `Bearer ${accessToken}`,
  }, obj);
}
