import expect from 'expect';
import nock from 'nock';
import mockStore from '../helpers/mockStore';
import env from '../../lib/env';
import {
  APPROVE_TRANSACTION_REQUEST,
  APPROVE_TRANSACTION_SUCCESS,
  APPROVE_TRANSACTION_FAILURE,
  REJECT_TRANSACTION_REQUEST,
  REJECT_TRANSACTION_SUCCESS,
  REJECT_TRANSACTION_FAILURE,
  approveTransaction,
  rejectTransaction
} from '../../actions/transactions';

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

      const expected = [
        { type: APPROVE_TRANSACTION_REQUEST, groupid, transactionid },
        { type: APPROVE_TRANSACTION_SUCCESS, groupid, transactionid, response }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(approveTransaction(groupid, transactionid));
    });

    it('creates APPROVE_TRANSACTION_FAILURE if it fails', (done) => {
      const groupid = 1;
      const transactionid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/approve`, {
          approved: true
        })
        .replyWithError('Something went wrong!');

      const expected = [
        { type: APPROVE_TRANSACTION_REQUEST, groupid, transactionid },
        { type: APPROVE_TRANSACTION_FAILURE, error: {} }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(approveTransaction(groupid, transactionid));
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

      const expected = [
        { type: REJECT_TRANSACTION_REQUEST, groupid, transactionid },
        { type: REJECT_TRANSACTION_SUCCESS, groupid, transactionid, response }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(rejectTransaction(groupid, transactionid));
    });

    it('creates REJECT_TRANSACTION_FAILURE if it fails', (done) => {
      const groupid = 1;
      const transactionid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/approve`, {
          approved: false
        })
        .replyWithError('Something went wrong!');

      const expected = [
        { type: REJECT_TRANSACTION_REQUEST, groupid, transactionid },
        { type: REJECT_TRANSACTION_FAILURE, error: {} }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(rejectTransaction(groupid, transactionid));
    });
  });


});
