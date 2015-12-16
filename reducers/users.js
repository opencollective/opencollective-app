import merge from 'lodash/object/merge';
import values from 'lodash/object/values'
import find from 'lodash/collection/find'

import * as constants from '../constants/users';

export default function users(state={
  updateInProgress: false,
  cards: []
}, action={}) {
  const { groups, transactions, userid, type, cards } = action;

  switch (type) {

    case constants.USER_GROUPS_SUCCESS:
      return merge({}, state, {
        [userid]: { groups }
      });

    case constants.USER_CARDS_SUCCESS:
      return merge({}, state, {
        [userid]: { cards }
      });

    case constants.USER_TRANSACTIONS_SUCCESS:
      return merge({}, state, {
        [userid]: { transactions }
      });

    case constants.FETCH_USER_SUCCESS:
      return merge({}, state, action.users);

    case constants.GET_APPROVAL_KEY_FOR_USER_REQUEST:
      return merge({}, state, { inProgress: true });

    case constants.GET_APPROVAL_KEY_FOR_USER_SUCCESS:
    case constants.GET_APPROVAL_KEY_FOR_USER_FAILURE:
      return merge({}, state, { inProgress: false });

    case constants.UPDATE_PAYPAL_EMAIL_REQUEST:
      return merge({}, state, { updateInProgress: true });

    case constants.UPDATE_PAYPAL_EMAIL_SUCCESS:
      return merge({}, state, { updateInProgress: false });

    case constants.UPDATE_PAYPAL_EMAIL_FAILURE:
      const error = action.error;
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

    default:
      return state;
  }
}

export function getPaypalCard(users, id) {
  const user = users[id] || {};
  const cards = values(user.cards);

  return find(cards, { service: 'paypal' }) || {};
};
