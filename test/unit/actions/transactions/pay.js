import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/transactions';
import payTransaction from '../../../../frontend/src/actions/transactions/pay';

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

      const store = mockStore({});

      store.dispatch(payTransaction(groupid, transactionid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.PAY_TRANSACTION_REQUEST, groupid, transactionid });
          expect(success).toEqual({ type: constants.PAY_TRANSACTION_SUCCESS, groupid, transactionid, json: response });
          done();
        })
        .catch(done)
    });

    it('creates PAY_TRANSACTION_FAILURE if it fails', (done) => {
      const groupid = 1;
      const transactionid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/transactions/${transactionid}/pay`)
        .replyWithError('Something went wrong!');

      const store = mockStore({});

      store.dispatch(payTransaction(groupid, transactionid))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.PAY_TRANSACTION_REQUEST, groupid, transactionid });
          expect(failure.type).toEqual(constants.PAY_TRANSACTION_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3000/api/groups/1/transactions/2/pay failed');
          done();
        })
    });

  });

});
