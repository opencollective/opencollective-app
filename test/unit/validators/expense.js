import expect from 'expect';
import validate from '../../../frontend/src/validators/expense';

describe('validator expense', () => {
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
    const expense = {
      attachment: 'http://google.com/photo.jpg',
      title: 'Expense',
      amount: 10,
      vat: 10.13,
      incurredAt: Date.now(),
      category: 'Computer'
    };

    validate(expense)
    .then(value => {
      expect(value).toEqual(expense);
      done();
    })
    .catch(error => console.log('error', error));
  });

  it('should not validate an incurredAt date in the future', (done) => {
    const expense = {
      description: 'Expense',
      amount: 10,
      incurredAt: '2120-10-10',
      category: 'Computer'
    };

    validate(expense)
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });

});
