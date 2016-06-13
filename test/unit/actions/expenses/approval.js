import nock from 'nock';
import expect from 'expect';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/expenses';
import approveExpense from '../../../../frontend/src/actions/expenses/approve';
import rejectExpense from '../../../../frontend/src/actions/expenses/reject';

describe('expense approval actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('approve a expense', () => {

    it('creates APPROVE_EXPENSE_SUCCESS if it approves successfully', (done) => {
      const groupid = 1;
      const expenseid = 2;
      const response = { success: true };

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/expenses/${expenseid}/approve`, {
          approved: true
        })
        .reply(200, response);

      const store = mockStore({});

      store.dispatch(approveExpense(groupid, expenseid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.APPROVE_EXPENSE_REQUEST, groupid, expenseid });
          expect(success).toEqual({ type: constants.APPROVE_EXPENSE_SUCCESS, groupid, expenseid, response });
          done();
        })
        .catch(done)
    });

    it('creates APPROVE_EXPENSE_FAILURE if it fails', (done) => {
      const groupid = 1;
      const expenseid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/expenses/${expenseid}/approve`, {
          approved: true
        })
        .replyWithError('Something went wrong!');

      const store = mockStore({});

      store.dispatch(approveExpense(groupid, expenseid))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.APPROVE_EXPENSE_REQUEST, groupid, expenseid });
          expect(failure.type).toEqual(constants.APPROVE_EXPENSE_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3030/api/groups/1/expenses/2/approve failed');
          done();
        })
    });

  });

  describe('reject a expense', () => {

    it('creates REJECT_EXPENSE_SUCCESS if it rejects successfully', (done) => {
      const groupid = 1;
      const expenseid = 2;
      const response = { success: true };

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/expenses/${expenseid}/approve`, {
          approved: false
        })
        .reply(200, response);

      const store = mockStore({});

      store.dispatch(rejectExpense(groupid, expenseid))
        .then(() => {
          const [request, success] = store.getActions();
          expect(request).toEqual({ type: constants.REJECT_EXPENSE_REQUEST, groupid, expenseid });
          expect(success).toEqual({ type: constants.REJECT_EXPENSE_SUCCESS, groupid, expenseid, response });
          done();
        })
        .catch(done)
    });

    it('creates REJECT_EXPENSE_FAILURE if it fails', (done) => {
      const groupid = 1;
      const expenseid = 2;

      nock(env.API_ROOT)
        .post(`/groups/${groupid}/expenses/${expenseid}/approve`, {
          approved: false
        })
        .replyWithError('Something went wrong!');

      const store = mockStore({});

      store.dispatch(rejectExpense(groupid, expenseid))
        .catch(() => {
          const [request, failure] = store.getActions();
          expect(request).toEqual({ type: constants.REJECT_EXPENSE_REQUEST, groupid, expenseid });
          expect(failure.type).toEqual(constants.REJECT_EXPENSE_FAILURE);
          expect(failure.error.message).toContain('request to http://localhost:3030/api/groups/1/expenses/2/approve failed');
          done();
        })
    });
  });


});
