import { post } from '../../lib/api';
import * as constants from '../../constants/images';

/**
 * Upload an image to S3
 */

export default (data, tag) => {
  return dispatch => {
    dispatch(request(data, tag));
    return post('images/', data)
      .then(json => dispatch(success(json, tag)))
      .catch(error => dispatch(failure(error, tag)));
  };
};

function request(data, tag) {
  return {
    type: constants.UPLOAD_IMAGE_REQUEST,
    data,
    tag
  };
}

function success(json, tag) {
  return {
    type: constants.UPLOAD_IMAGE_SUCCESS,
    response: json,
    tag
  };
}

function failure(error, tag) {
  return {
    type: constants.UPLOAD_IMAGE_FAILURE,
    error: error,
    tag
  };
}


