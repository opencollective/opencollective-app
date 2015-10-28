import { post } from '../lib/api';
import * as constants from '../constants/images';

/**
 * Upload an image to S3
 */

export function uploadImage(data) {
  return dispatch => {
    dispatch(uploadImageRequest(data));
    return post('images/', data)
      .then(json => dispatch(uploadImageSuccess(json)))
      .catch(error => dispatch(uploadImageFailure(error)));
  };
}

function uploadImageRequest(data) {
  return {
    type: constants.UPLOAD_IMAGE_REQUEST,
    data
  };
}

function uploadImageSuccess(json) {
  return {
    type: constants.UPLOAD_IMAGE_SUCCESS,
    response: json
  };
}

function uploadImageFailure(error) {
  return {
    type: constants.UPLOAD_IMAGE_FAILURE,
    error: error
  };
}


