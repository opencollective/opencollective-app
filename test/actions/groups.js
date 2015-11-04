import expect from 'expect';
import nock from 'nock';
import mockStore from '../helpers/mockStore';
import env from '../../lib/env';
import fetchById from '../../actions/groups/fetch_by_id';
import * as constants from '../../constants/groups';

describe('groups actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates GROUP_SUCCESS when fetching a group is done', (done) => {
    const group = {
      id: 1,
      description: 'happy stuff'
    };

    nock(env.API_ROOT)
      .get('/groups/1')
      .reply(200, group);

    const expected = [
      { type: constants.GROUP_REQUEST, id: 1 },
      { type: constants.GROUP_SUCCESS, id: 1, groups: {1: group} }
    ];
    const store = mockStore({}, expected, done);
    store.dispatch(fetchById(1));
  });

  it('creates GROUP_ERROR when fetching a group fails', (done) => {
    nock(env.API_ROOT)
      .get('/groups/1')
      .replyWithError('Something went wrong!');

    // Improve test with error message
    const expected = [
      { type: constants.GROUP_REQUEST, id: 1 },
      { type: constants.GROUP_FAILURE, id: 1, error: {}}
    ];
    const store = mockStore({}, expected, done);
    store.dispatch(fetchById(1));
  });

});
