import { post } from '../lib/api';

/**
 * Constants
 */

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';


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
    type: UPLOAD_IMAGE_REQUEST,
    data
  };
}

function uploadImageSuccess(json) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    response: json,
    receivedAt: Date.now()
  };
}

function uploadImageFailure(error) {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    error: error,
    receivedAt: Date.now()
  };
}


