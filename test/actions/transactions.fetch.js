import expect from 'expect';
import nock from 'nock';
import mockStore from '../helpers/mockStore';
import env from '../../lib/env';
import {
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_FAILURE,
  TRANSACTION_REQUEST,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILURE,
  fetchTransactions,
  fetchTransaction,
} from '../../actions/transactions';

describe('transactions actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetch one transaction', () => {

    it('creates TRANSACTION_SUCCESS if it fetches successfully', (done) => {
      const transaction = {
        id: 2,
        amount: 999
      };
      const groupid = 1;
      const transactionid = transaction.id;

      nock(env.API_ROOT)
        .get(`/groups/${groupid}/transactions/${transactionid}`)
        .reply(200, transaction);

      const success = {
        type: TRANSACTION_SUCCESS,
        groupid,
        transactionid,
        transactions: { 2: transaction }
      };

      const expected = [
        { type: TRANSACTION_REQUEST, groupid, transactionid },
        success
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchTransaction(groupid, transactionid));
    });

    it('creates TRANSACTION_FAILURE if it fails to fetch a transaction', (done) => {
      const transaction = {
        id: 2,
        amount: 999
      };
      const groupid = 1;
      const transactionid = transaction.id;

      nock(env.API_ROOT)
        .get(`/groups/${groupid}/transactions/${transactionid}`)
        .replyWithError('Something went wrong!');

      const expected = [
        { type: TRANSACTION_REQUEST, groupid, transactionid },
        { type: TRANSACTION_FAILURE, error: {} }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchTransaction(groupid, transactionid));
    });
  });

  describe('fetch multiple transactions', () => {

    it('creates TRANSACTIONS_SUCCESS if it fetches successfully', (done) => {
      const transaction = {
        id: 2,
        amount: 999
      };
      const groupid = 1;

      nock(env.API_ROOT)
        .get(`/groups/${groupid}/transactions`)
        .reply(200, [transaction]);

      const success = {
        type: TRANSACTIONS_SUCCESS,
        groupid,
        transactions: { 2: transaction }
      };

      const expected = [
        { type: TRANSACTIONS_REQUEST, groupid },
        success
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchTransactions(groupid));
    });

    it('creates TRANSACTIONS_FAILURE if it fails', (done) => {
      const groupid = 1;

      nock(env.API_ROOT)
        .get(`/groups/${groupid}/transactions`)
        .replyWithError('Oops');

      const expected = [
        { type: TRANSACTIONS_REQUEST, groupid },
        { type: TRANSACTIONS_FAILURE, error: {} }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchTransactions(groupid));
    });
  });

});
