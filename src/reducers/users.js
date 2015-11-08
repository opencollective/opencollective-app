import merge from 'lodash/object/merge';
import * as constants from '../constants/users';

export default function users(state={}, action={}) {
  const { groups, transactions, userid, type } = action;

  switch (type) {

    case constants.USER_GROUPS_SUCCESS:
      return merge({}, state, {
        [userid]: { groups }
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
    case constants.UPDATE_PAYPAL_EMAIL_FAILURE:
      return merge({}, state, { updateInProgress: false });


    default:
      return state;
  }
}

