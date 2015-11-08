import expect from 'expect';
import nock from 'nock';
import mockStore from '../helpers/mockStore';
import env from '../../src/lib/env';
import uploadImage from '../../src/actions/images/upload';
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from '../../src/constants/images';

describe('images actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates UPLOAD_IMAGE_SUCCESS when uploading an image is done', (done) => {
    const image = {
      url: 'http://google.com/cat.jpg'
    };

    nock(env.API_ROOT)
      .post('/images/')
      .reply(200, image);

    const expected = [
      { type: UPLOAD_IMAGE_REQUEST, data: {} },
      { type: UPLOAD_IMAGE_SUCCESS, response: image }
    ];
    const store = mockStore({}, expected, done);
    store.dispatch(uploadImage({}));
  });

  it('creates UPLOAD_IMAGE_FAILURE when uploading an image fails', (done) => {
    nock(env.API_ROOT)
      .post('/images/')
      .replyWithError('Fail');

    const expected = [
      { type: UPLOAD_IMAGE_REQUEST, data: {} },
      { type: UPLOAD_IMAGE_FAILURE, error: {} }
    ];
    const store = mockStore({}, expected, done);
    store.dispatch(uploadImage({}));
  });

});
