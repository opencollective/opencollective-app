import { putJSON } from '../../lib/api';
import * as constants from '../../constants/users';

/**
 * update avatar for user
 */

export default (userid, avatar) => {
  const url = `users/${userid}/avatar`;

  return dispatch => {
    dispatch(request(userid, avatar));
    console.log('dispatch: ' + avatar)
    return putJSON(url, { avatar })
      .then(json => dispatch(success(userid, avatar, json)))
      .catch(err => dispatch(failure(err)));
  };
};

function request(userid, avatar) {
  return {
    type: constants.UPDATE_AVATAR_REQUEST,
    avatar,
    userid
  };
}

function success(userid, avatar, json) {
  return {
    type: constants.UPDATE_AVATAR_SUCCESS,
    userid,
    avatar,
    json
  };
}

function failure(error) {
  return {
    type: constants.UPDATE_AVATAR_FAILURE,
    error
  };
}
