import fetch from 'isomorphic-fetch';

/**
 * Temporary until the backend has real data
 */
const API_ROOT = 'https://private-04792-opencollective.apiary-mock.com/';

export function get(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response => response.json());
}
