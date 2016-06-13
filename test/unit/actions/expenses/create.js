import nock from 'nock';
import expect from 'expect';
import _ from 'lodash';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/expenses';
import createExpense from '../../../../frontend/src/actions/expenses/create';

describe('expenses create actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates CREATE_EXPENSE_SUCCESS if it is successful', (done) => {
    const groupid = 1;
    const expense = { amount: 999 };
    const response = _.extend(expense, { id: 2 });
    const expenses = {
      [response.id]: response
    };

    nock(env.API_ROOT)
      .post(`/groups/${groupid}/expenses/`, {expense})
      .reply(200, response);

    const store = mockStore({});

    store.dispatch(createExpense(groupid, expense))
      .then(() => {
        const [request, success] = store.getActions();
        expect(request).toEqual({ type: constants.CREATE_EXPENSE_REQUEST, groupid, expense });
        expect(success).toEqual({ type: constants.CREATE_EXPENSE_SUCCESS, groupid, expenses });
        done();
      })
      .catch(done)
  });

  it('creates CREATE_EXPENSE_FAILURE if it fails', (done) => {
    const groupid = 1;
    const expense = { amount: 999 };

    nock(env.API_ROOT)
      .post(`/groups/${groupid}/expenses/`)
      .replyWithError('');

    const store = mockStore({});

    store.dispatch(createExpense(groupid, expense))
      .catch(() => {
        const [request, failure] = store.getActions();
        expect(request).toEqual({ type: constants.CREATE_EXPENSE_REQUEST, groupid, expense });
        expect(failure.type).toEqual(constants.CREATE_EXPENSE_FAILURE);
        expect(failure.error.message).toContain('request to http://localhost:3030/api/groups/1/expenses/ failed');
        done();
      })
  });

});
