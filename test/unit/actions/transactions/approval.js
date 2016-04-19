import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/transactions';
import approveTransaction from '../../../../frontend/src/actions/transactions/approve';
import rejectTransaction from '../../../../frontend/src/actions/transactions/reject';

describe('transactions approval actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('approve a transaction', () => {

    it('creates APPROVE_TRANSACTION_SUCCESS if it approves successfully', (done) => {
      const groupid = 1;
      const transactionid = 2;
      const response = { success: true };

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/approve`, {
          approved: true
        })
        .reply(200, response);

      const store = mockStore({});

      store.dispatch(approveTransaction(groupid, transactionid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.APPROVE_TRANSACTION_REQUEST, groupid, transactionid });
          expect(success).toEqual({ type: constants.APPROVE_TRANSACTION_SUCCESS, groupid, transactionid, response });
          done();
        })
        .catch(done)
    });

    it('creates APPROVE_TRANSACTION_FAILURE if it fails', (done) => {
      const groupid = 1;
      const transactionid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/approve`, {
          approved: true
        })
        .replyWithError('Something went wrong!');

      const store = mockStore({});

      store.dispatch(approveTransaction(groupid, transactionid))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.APPROVE_TRANSACTION_REQUEST, groupid, transactionid });
          expect(failure.type).toEqual(constants.APPROVE_TRANSACTION_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3030/api/groups/1/transactions/2/approve failed');
          done();
        })
    });

  });

  describe('reject a transaction', () => {

    it('creates REJECT_TRANSACTION_SUCCESS if it rejects successfully', (done) => {
      const groupid = 1;
      const transactionid = 2;
      const response = { success: true };

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/approve`, {
          approved: false
        })
        .reply(200, response);

      const store = mockStore({});

      store.dispatch(rejectTransaction(groupid, transactionid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.REJECT_TRANSACTION_REQUEST, groupid, transactionid });
          expect(success).toEqual({ type: constants.REJECT_TRANSACTION_SUCCESS, groupid, transactionid, response });
          done();
        })
        .catch(done)
    });

    it('creates REJECT_TRANSACTION_FAILURE if it fails', (done) => {
      const groupid = 1;
      const transactionid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/approve`, {
          approved: false
        })
        .replyWithError('Something went wrong!');

      const store = mockStore({});

      store.dispatch(rejectTransaction(groupid, transactionid))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.REJECT_TRANSACTION_REQUEST, groupid, transactionid });
          expect(failure.type).toEqual(constants.REJECT_TRANSACTION_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3030/api/groups/1/transactions/2/approve failed');
          done();
        })
    });
  });


});
