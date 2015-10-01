import fetch from 'isomorphic-fetch';
import { normalize } from 'normalizr';

/**
 * Get request
 */

export function get(endpoint, schema) {
  return fetch(url(endpoint))
    .then(checkStatus)
    .then(json => {
      const entities = normalize(json, schema).entities;
      return Object.assign({}, entities);
    });
}

/**
 * POST json request
 */

export function postJSON(endpoint, body) {
  return fetch(url(endpoint), {
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
    method: 'post',
    body,
  })
  .then(checkStatus);
}

/**
 * Will be saved in environment later
 */

const API_ROOT = 'http://localhost:3060/';

function url(endpoint) {
  return (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
}

/**
 * The Promise returned from fetch() won't reject on HTTP error status. We
 * need to throw an error ourselves.
 */

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

