import expect from 'expect';
import validate from '../../../frontend/src/validators/fund';

describe('validator fund', () => {
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
    const fund = {
      description: 'Expense',
      amount: 10,
      createdAt: Date.now(),
      tags: ['Computer']
    };

    validate(fund)
    .then(value => {
      expect(value).toEqual(fund);
      done();
    })
    .catch(error => console.log('error', error));
  });

  it('should not validate a createdAt date in the future', (done) => {
    const fund = {
      description: 'Expense',
      amount: 10,
      createdAt: '2120-10-10',
      tags: ['Computer']
    };

    validate(fund)
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });

});
