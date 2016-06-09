import { get } from '../../lib/api';
import Schemas from '../../lib/schemas';
import * as constants from '../../constants/transactions';
import { normalize } from 'normalizr';
import merge from 'lodash/object/merge';

/**
 * Fetch multiple transactions in a group
 */

export default (groupid, params={}) => {
  return dispatch => {
    dispatch(request(groupid));
    const donationParams = merge({}, params);
    donationParams.donation = true;
    let donations, expenses;
    return get(`groups/${groupid}/transactions`, { params: donationParams })
    .then(ds => donations = ds.map(d => {
      d.id = 'd'+d.id;
      return d;
    }))
    .then(() => get(`groups/${groupid}/expenses`, { params }))
    .then(es => expenses = es.map(e => {
      e.id = 'e'+e.id;
      return e;
    }))
    .then(() => [...donations, ...expenses])
    .then(json => normalize(json, Schemas.TRANSACTION_ARRAY).entities)
    .then(json => dispatch(success(groupid, json)))
    .catch(error => dispatch(failure(error)));
  };
};

function request(groupid) {
  return {
    type: constants.TRANSACTIONS_REQUEST,
    groupid
  };
}

function success(groupid, json) {
  return {
    type: constants.TRANSACTIONS_SUCCESS,
    groupid,
    transactions: json.transactions,
  };
}

function failure(error) {
  return {
    type: constants.TRANSACTIONS_FAILURE,
    error,
  };
}
