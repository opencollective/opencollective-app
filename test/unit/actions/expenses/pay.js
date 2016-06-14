import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/expenses';
import payExpense from '../../../../frontend/src/actions/expenses/pay';

describe('expenses pay actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('pay a expense', () => {

    it('creates PAY_EXPENSE_SUCCESS if it pays successfully', (done) => {
      const groupid = 1;
      const expenseid = 2;
      const response = { status: 'REIMBURSED' };

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/expenses/${expenseid}/pay`)
        .reply(200, response);

      const store = mockStore({});

      store.dispatch(payExpense(groupid, expenseid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.PAY_EXPENSE_REQUEST, groupid, expenseid });
          expect(success).toEqual({ type: constants.PAY_EXPENSE_SUCCESS, groupid, expenseid, json: response });
          done();
        })
        .catch(done)
    });

    it('creates PAY_EXPENSE_FAILURE if it fails', (done) => {
      const groupid = 1;
      const expenseid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/expenses/${expenseid}/pay`)
        .replyWithError('Something went wrong!');

      const store = mockStore({});

      store.dispatch(payExpense(groupid, expenseid))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.PAY_EXPENSE_REQUEST, groupid, expenseid });
          expect(failure.type).toEqual(constants.PAY_EXPENSE_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3030/api/groups/1/expenses/2/pay failed');
          done();
        })
    });

  });

});
