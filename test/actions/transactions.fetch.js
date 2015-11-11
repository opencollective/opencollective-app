import expect from 'expect';
import nock from 'nock';
import mockStore from '../helpers/mockStore';
import env from '../../src/lib/env';
import * as constants from '../../src/constants/transactions';
import fetchById from '../../src/actions/transactions/fetch_by_id';
import fetchByGroup from '../../src/actions/transactions/fetch_by_group';

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
        type: constants.TRANSACTION_SUCCESS,
        groupid,
        transactionid,
        transactions: { 2: transaction }
      };

      const expected = [
        { type: constants.TRANSACTION_REQUEST, groupid, transactionid },
        success
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchById(groupid, transactionid));
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
        { type: constants.TRANSACTION_REQUEST, groupid, transactionid },
        { type: constants.TRANSACTION_FAILURE, error: {} }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchById(groupid, transactionid));
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
        type: constants.TRANSACTIONS_SUCCESS,
        groupid,
        transactions: { 2: transaction }
      };

      const expected = [
        { type: constants.TRANSACTIONS_REQUEST, groupid },
        success
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchByGroup(groupid));
    });

    it('creates TRANSACTIONS_FAILURE if it fails', (done) => {
      const groupid = 1;

      nock(env.API_ROOT)
        .get(`/groups/${groupid}/transactions`)
        .replyWithError('Oops');

      const expected = [
        { type: constants.TRANSACTIONS_REQUEST, groupid },
        { type: constants.TRANSACTIONS_FAILURE, error: {} }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(fetchByGroup(groupid));
    });
  });

});
