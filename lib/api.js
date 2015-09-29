import fetch from 'isomorphic-fetch';
import { Schema, arrayOf, normalize } from 'normalizr';

/**
 * Temporary until the backend has real data
 */
const API_ROOT = 'https://private-04792-opencollective.apiary-mock.com/';

export function get(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(res => res.json())
    .then(json => {
      const entities = normalize(json, schema).entities;
      return Object.assign({}, entities);
    });
}

const GroupSchema = new Schema('groups');
const TransactionSchema = new Schema('transactions');


export const Schemas = {
  GROUP: GroupSchema,
  GROUP_ARRAY: arrayOf(GroupSchema),
  TRANSACTION: TransactionSchema,
  TRANSACTION_ARRAY: arrayOf(TransactionSchema)
};
