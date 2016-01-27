import { expect } from 'chai';

import rejectError from '../../../lib/reject_error';

describe('rejectError', () => {

  it('should resolve if no error', (done) => {
    rejectError().then(done);
  });

  it('should reject if it is an error object', (done) => {
    const error = {
      message: 'Fail'
    };

    rejectError({error}).catch(({message}) => {
      expect(message).to.be.equal(error.message);
      done();
    });
  });

  it('should reject if we specify the error name in the props', (done) => {
    const serverError = {
      message: '500 Something went wrong'
    };
    const props = { serverError };

    rejectError.call({props}, 'serverError')
    .catch(({message}) => {
      expect(message).to.be.equal(serverError.message);
      done();
    });
  });

  it('should resolve if the error does not exist', (done) => {
    rejectError.call({}, 'someError')
    .then(done);
  })
});