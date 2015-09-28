import fetch from 'isomorphic-fetch';

const API_ROOT = 'https://private-04792-opencollective.apiary-mock.com/';

/**
 * Call the backend api
 */
export function callApi (endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response => response.json());
}
