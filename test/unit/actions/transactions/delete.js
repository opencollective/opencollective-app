import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/transactions';
import deleteTransaction from '../../../../frontend/src/actions/transactions/delete';

describe('transactions delete actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates DELETE_TRANSACTION_SUCCESS if it is successful', (done) => {
    const groupid = 1;
    const transactionid = 2;

    nock(env.API_ROOT)
      .delete(`/groups/${groupid}/transactions/${transactionid}`)
      .reply(200, { success: true });

    const store = mockStore({});
    store.dispatch(deleteTransaction(groupid, transactionid))
    .then(() => {
      const [request, success] = store.getActions();
      expect(request).toEqual({ type: constants.DELETE_TRANSACTION_REQUEST, groupid, transactionid });
      expect(success).toEqual({ type: constants.DELETE_TRANSACTION_SUCCESS, groupid, transactionid });
      done();
    })
    .catch(done);
  });

  it('creates DELETE_TRANSACTION_FAILURE if it fails', (done) => {
    const groupid = 1;
    const transactionid = 2;

    nock(env.API_ROOT)
      .delete(`/groups/${groupid}/transactions/${transactionid}`)
      .replyWithError('');


    const store = mockStore({});
    store.dispatch(deleteTransaction(groupid, transactionid))
    .catch(() => {
      const [request, failure] = store.getActions();
      expect(request).toEqual({ type: constants.DELETE_TRANSACTION_REQUEST, groupid, transactionid });
      expect(failure.type).toEqual(constants.DELETE_TRANSACTION_FAILURE);
      expect(failure.error.message).toContain('request to http://localhost:3000/api/groups/1/transactions/2 failed');
      done();
    });
  });

});
