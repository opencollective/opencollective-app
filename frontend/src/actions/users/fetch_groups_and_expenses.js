import keys from 'lodash/object/keys';
import merge from 'lodash/object/merge';
import expenses from '../expenses/fetch_by_group';
import fetchGroups from './fetch_groups';
import * as constants from '../../constants/users';


/**
 * This action doesn't scale well, we will need to add an api route to handle
 * that type of data fetching, we will leave it here for the prototype
 */

export default (userid, options={}) => {
  return dispatch => {
    dispatch(request(userid));

    return dispatch(fetchGroups(userid))
    .then(({groups}) => {
      const ids = keys(groups);
      return Promise.all(ids.map(id => dispatch(expenses(id, options))));
    })
    .then((json) => {
      const merged = merge.apply(null, json) || {};
      return dispatch(success(userid, merged));
    })
    .catch(error => dispatch(failure(error)));
  };
};

function request(userid) {

  return {
    type: constants.USER_GROUP_AND_EXPENSES_REQUEST,
    userid
  };
}

function success(userid, {expenses}) {
  return {
    type: constants.USER_GROUP_AND_EXPENSES_SUCCESS,
    userid,
    expenses,
  };
}

function failure(error) {
  return {
    type: constants.USER_GROUP_AND_EXPENSES_FAILURE,
    error,
  };
}


