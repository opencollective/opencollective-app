import { postJSON } from '../../lib/api';
import * as constants from '../../constants/groups';

/**
 * Donate to a group
 */

export default (groupid, payment) => {
  const url = `groups/${groupid}/payments/`;

  return dispatch => {
    console.log('request', groupid, payment);
    dispatch(request(groupid, payment));
    return postJSON(url, {payment})
      .then(json => dispatch(success(groupid, json)))
      .catch(error => dispatch(failure(error)));
  };
};

function request(groupid, payment) {
  return {
    type: constants.DONATE_GROUP_REQUEST,
    groupid,
    payment
  };
}

function success(groupid, payment) {

  return {
    type: constants.DONATE_GROUP_SUCCESS,
    groupid,
    payment
  };
}

function failure(error) {
  return {
    type: constants.DONATE_GROUP_FAILURE,
    error
  };
}
