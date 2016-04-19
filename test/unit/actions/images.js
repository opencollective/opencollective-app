import nock from 'nock';
import expect from 'expect';
import mockStore from '../helpers/mockStore';
import env from '../../../frontend/src/lib/env';
import uploadImage from '../../../frontend/src/actions/images/upload';
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from '../../../frontend/src/constants/images';

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

    const store = mockStore({});

    store.dispatch(uploadImage({}))
      .then(() => {
        const [request, success] = store.getActions();
        expect(request).toEqual({ type: UPLOAD_IMAGE_REQUEST, data: {} });
        expect(success).toEqual({ type: UPLOAD_IMAGE_SUCCESS, response: image });
        done();
      })
      .catch(done)
  });

  it('creates UPLOAD_IMAGE_FAILURE when uploading an image fails', (done) => {
    nock(env.API_ROOT)
      .post('/images/')
      .replyWithError('');

    const store = mockStore({});

    store.dispatch(uploadImage({}))
      .then(() => {
        const [request, failure] = store.getActions();
        expect(request).toEqual({ type: UPLOAD_IMAGE_REQUEST, data: {} });
        expect(failure.type).toEqual(UPLOAD_IMAGE_FAILURE);
        expect(failure.error.message).toContain('request to http://localhost:3030/api/images/ failed');
        done();
      })
      .catch(done)
  });

});
