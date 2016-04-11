import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/transactions';
import fetchById from '../../../../frontend/src/actions/transactions/fetch_by_id';
import fetchByGroup from '../../../../frontend/src/actions/transactions/fetch_by_group';

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

      const store = mockStore({});
      store.dispatch(fetchById(groupid, transactionid))
      .then(() => {
        const [request, success] = store.getActions();
        expect(request).toEqual({ type: constants.TRANSACTION_REQUEST, groupid, transactionid });
        expect(success).toEqual({ type: constants.TRANSACTION_SUCCESS, groupid, transactionid, transactions: { 2: transaction } });
        done();
      })
      .catch(done);
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
        .replyWithError('');

      const store = mockStore({});
      store.dispatch(fetchById(groupid, transactionid))
      .then(() => {
        const [request, failure] = store.getActions();
        expect(request).toEqual({ type: constants.TRANSACTION_REQUEST, groupid, transactionid });
        expect(failure.type).toEqual(constants.TRANSACTION_FAILURE);
        expect(failure.error.message).toContain('request to http://localhost:3000/api/groups/1/transactions/2 failed');
        done();
      })
      .catch(done);
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

      const store = mockStore({});
      store.dispatch(fetchByGroup(groupid))
      .then(() => {
        const [request, success] = store.getActions();
        expect(request).toEqual({ type: constants.TRANSACTIONS_REQUEST, groupid });
        expect(success).toEqual({ type: constants.TRANSACTIONS_SUCCESS, groupid, transactions: { 2: transaction } });
        done();
      });
    });

    it('creates TRANSACTIONS_FAILURE if it fails', (done) => {
      const groupid = 1;

      nock(env.API_ROOT)
        .get(`/groups/${groupid}/transactions`)
        .replyWithError('');

      const store = mockStore({});
      store.dispatch(fetchByGroup(groupid))
      .then(() => {
        const [request, failure] = store.getActions();
        expect(request).toEqual({ type: constants.TRANSACTIONS_REQUEST, groupid });
        expect(failure.type).toEqual(constants.TRANSACTIONS_FAILURE);
        expect(failure.error.message).toContain('request to http://localhost:3000/api/groups/1/transactions failed');
        done();
      })
      .catch(done);
    });
  });

});
