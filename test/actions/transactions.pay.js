import expect from 'expect';
import nock from 'nock';
import mockStore from '../helpers/mockStore';
import env from '../../lib/env';
import {
  PAY_TRANSACTION_REQUEST,
  PAY_TRANSACTION_SUCCESS,
  PAY_TRANSACTION_FAILURE,
  payTransaction,
} from '../../actions/transactions';

describe('transactions pay actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('pay a transaction', () => {

    it('creates PAY_TRANSACTION_SUCCESS if it pays successfully', (done) => {
      const groupid = 1;
      const transactionid = 2;
      const response = { status: 'REIMBURSED' };

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/pay`)
        .reply(200, response);

      const expected = [
        { type: PAY_TRANSACTION_REQUEST, groupid, transactionid },
        { type: PAY_TRANSACTION_SUCCESS, groupid, transactionid, json: response }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(payTransaction(groupid, transactionid));
    });

    it('creates PAY_TRANSACTION_FAILURE if it fails', (done) => {
      const groupid = 1;
      const transactionid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/pay`)
        .replyWithError('Something went wrong!');

      const expected = [
        { type: PAY_TRANSACTION_REQUEST, groupid, transactionid },
        { type: PAY_TRANSACTION_FAILURE, error: {} }
      ];

      const store = mockStore({}, expected, done);
      store.dispatch(payTransaction(groupid, transactionid));
    });

  });

});
