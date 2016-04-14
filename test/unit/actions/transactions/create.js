import nock from 'nock';
import expect from 'expect';
import _ from 'lodash';
import mockStore from '../../helpers/mockStore';
import env from '../../../../frontend/src/lib/env';
import * as constants from '../../../../frontend/src/constants/transactions';
import createTransaction from '../../../../frontend/src/actions/transactions/create';

describe('transactions create actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates CREATE_TRANSACTION_SUCCESS if it is successful', (done) => {
    const groupid = 1;
    const transaction = { amount: 999 };
    const response = _.extend(transaction, { id: 2 });
    const transactions = {
      [response.id]: response
    };

    nock(env.API_ROOT)
      .post(`/groups/${groupid}/transactions/`, {transaction})
      .reply(200, response);

    const store = mockStore({});

    store.dispatch(createTransaction(groupid, transaction))
      .then(() => {
        const [request, success] = store.getActions();
        expect(request).toEqual({ type: constants.CREATE_TRANSACTION_REQUEST, groupid, transaction });
        expect(success).toEqual({ type: constants.CREATE_TRANSACTION_SUCCESS, groupid, transactions });
        done();
      })
      .catch(done)
  });

  it('creates CREATE_TRANSACTION_FAILURE if it fails', (done) => {
    const groupid = 1;
    const transaction = { amount: 999 };

    nock(env.API_ROOT)
      .post(`/groups/${groupid}/transactions/`)
      .replyWithError('');

    const store = mockStore({});

    store.dispatch(createTransaction(groupid, transaction))
      .catch(() => {
        const [request, failure] = store.getActions();
        expect(request).toEqual({ type: constants.CREATE_TRANSACTION_REQUEST, groupid, transaction });
        expect(failure.type).toEqual(constants.CREATE_TRANSACTION_FAILURE);
        expect(failure.error.message).toContain('request to http://localhost:3000/api/groups/1/transactions/ failed');
        done();
      })
  });

});
