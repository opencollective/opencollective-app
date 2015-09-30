import fetch from 'isomorphic-fetch';
import { Schema, arrayOf, normalize } from 'normalizr';

/**
 * Will be saved in environment later
 */

const API_ROOT = 'http://localhost:3060/';

function url(endpoint) {
  return (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
}

function handleResponse (response) {
  if (response.status >= 400) {
      throw new Error('Bad response from server');
  }
  return response.json();
}

/**
 * Get request
 */

export function get(endpoint, schema) {
  return fetch(url(endpoint))
    .then(handleResponse)
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
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(handleResponse);
}

/**
 * Schemas
 */

const GroupSchema = new Schema('groups');
const TransactionSchema = new Schema('transactions');

/**
 * Export all the schemas to normalize them later
 */

export const Schemas = {
  GROUP: GroupSchema,
  GROUP_ARRAY: arrayOf(GroupSchema),
  TRANSACTION: TransactionSchema,
  TRANSACTION_ARRAY: arrayOf(TransactionSchema),
};
