import expect from 'expect';
import nock from 'nock';
import mockStore from '../helpers/mockStore';
import env from '../../lib/env';
import {
  GROUP_REQUEST,
  GROUP_SUCCESS,
  GROUP_FAILURE,
  fetchGroup,
} from '../../actions/groups';

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
      { type: GROUP_REQUEST, id: 1 },
      { type: GROUP_SUCCESS, id: 1, groups: {1: group} }
    ];
    const store = mockStore({}, expected, done);
    store.dispatch(fetchGroup(1));
  });

  it('creates GROUP_ERROR when fetching a group fails', (done) => {
    nock(env.API_ROOT)
      .get('/groups/1')
      .replyWithError('Something went wrong!');

    const expected = [
      { type: GROUP_REQUEST, id: 1 },
      { type: GROUP_FAILURE, id: 1, error: {}}
    ];
    const store = mockStore({}, expected, done);
    store.dispatch(fetchGroup(1));
  });

});
