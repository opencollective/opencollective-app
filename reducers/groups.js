import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';
import mapValues from 'lodash/object/mapValues';

import * as constants from '../constants/groups';

export default function groups(state={
  updated: {}
}, action={}) {
  switch (action.type) {

    case constants.GROUP_SUCCESS:
    case constants.GROUPS_SUCCESS:
      return merge({}, state, action.groups);

    case constants.GROUP_SUCCESS:
    case constants.GROUPS_SUCCESS:
      return merge({}, state, action.groups);

    case constants.DONATE_GROUP_REQUEST:
      return merge({}, state, { donateInProgress: true });

    case constants.DONATE_GROUP_SUCCESS:
      return merge({}, state, {
        donateInProgress: false,
        payment: action.json.payment
      });

    case constants.UPDATE_GROUP_SUCCESS:
      return merge({}, state, {
        updated: mapValues(action.attributes, val => !!val)
      });

    case constants.UPDATE_GROUP_FAILURE:
      return merge({}, omit(state, 'updated'), { updated: {} });

    case constants.DONATE_GROUP_FAILURE:
      return merge({}, state, {
        donateInProgress: false,
        error: action.error
      });

    default:
      return state;
  }
}

