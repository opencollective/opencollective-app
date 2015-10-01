import { post } from '../lib/api';
import Schemas from '../lib/schemas';

/**
 * Constants
 */

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';

/**
 * Fetch one group
 */

export function uploadImage(data) {
  return dispatch => {
    return post('images/', data)
      .then(json => dispatch(uploadImageSuccess(json)));
  };
}

function uploadImageSuccess(json) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    response: json,
    receivedAt: Date.now(),
  };
}

