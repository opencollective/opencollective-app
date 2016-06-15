import merge from 'lodash/object/merge';
import values from 'lodash/object/values'
import find from 'lodash/collection/find'
import mapValues from 'lodash/object/mapValues'

import * as constants from '../constants/users';

export default function users(state={
  updateInProgress: false,
  cards: []
}, action={}) {
  const {
    groups,
    expenses,
    userid,
    groupid,
    type,
    cards,
    error,
    users
  } = action;
  const GroupId = Number(groupid);

  switch (type) {
    case constants.USER_GROUPS_SUCCESS:
    Object.keys(groups).map(value =>
      groups[value] = Object.assign({}, groups[value], {balance: groups[value].balance/= 100}))
      return merge({}, state, {
        [userid]: { groups }
      });

    case constants.USER_CARDS_SUCCESS:
      return merge({}, state, {
        [userid]: { cards }
      });

    case constants.USER_GROUP_AND_EXPENSES_SUCCESS:
      return merge({}, state, { [userid]: { expenses } });

    case constants.FETCH_USER_SUCCESS:
      return merge({}, state, users);

    case constants.FETCH_USERS_BY_GROUP_SUCCESS:
      const usersWithGroup = mapValues(users, obj => merge(obj, { GroupId }));
      return merge({}, state, usersWithGroup);

    case constants.GET_APPROVAL_KEY_FOR_USER_REQUEST:
      return merge({}, state, { inProgress: true });

    case constants.GET_APPROVAL_KEY_FOR_USER_SUCCESS:
    case constants.GET_APPROVAL_KEY_FOR_USER_FAILURE:
      return merge({}, state, { inProgress: false });

    case constants.UPDATE_AVATAR_REQUEST:
    case constants.UPDATE_PAYPAL_EMAIL_REQUEST:
    case constants.UPDATE_USER_REQUEST:
      return merge({}, state, { updateInProgress: true });

    case constants.UPDATE_AVATAR_SUCCESS:
    case constants.UPDATE_PAYPAL_EMAIL_SUCCESS:
    case constants.UPDATE_USER_SUCCESS:
      return merge({}, state, { updateInProgress: false });

    case constants.UPDATE_AVATAR_FAILURE:
    case constants.UPDATE_PAYPAL_EMAIL_FAILURE:
    case constants.UPDATE_USER_FAILURE:
      return merge({}, state, { updateInProgress: false, error });

    case constants.GET_PREAPPROVAL_DETAILS_REQUEST:
      return merge({}, state, { preapprovalDetailsInProgress: true });

    case constants.GET_PREAPPROVAL_DETAILS_SUCCESS:
      return merge({}, state, {
        preapprovalDetailsInProgress: false,
        preapprovalDetails: action.json
      });

    case constants.GET_PREAPPROVAL_DETAILS_FAILURE:
      return merge({}, state, {
        preapprovalDetailsInProgress: false,
      });

    case constants.FETCH_USERS_BY_GROUP_FAILURE:
      return merge({}, state, { error });

    default:
      return state;
  }
}

export function getPaypalCard(users, id) {
  const user = users[id] || {};
  const cards = values(user.cards);

  return find(cards, { service: 'paypal' }) || {};
};
