import expect from 'expect';
import validate from '../../validators/transaction';

describe('validator transaction', () => {
  it('should reject the promise when the data is not valid', (done) => {
    validate({
      description: 1
    })
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });

  it('should resolve the promise when the data is valid', (done) => {
    const transaction = {
      description: 'Expense',
      amount: 10,
      createdAt: Date.now(),
      tags: ['Computer']
    };

    validate(transaction)
    .then(value => {
      expect(value).toEqual(value);
      done();
    });
  });

});