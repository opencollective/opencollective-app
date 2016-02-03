import expect from 'expect';
import { schema } from '../../../containers/Login';
import validate from '../../../lib/validate';

describe('Login container', () => {

  describe('Form validation', () => {
    it('should reject the promise when the data is not valid', (done) => {
      validate({
        email: 'ben'
      }, schema)
      .catch(error => {
        expect(error.name).toEqual('ValidationError');
        done();
      });
    });

    it('should resolve the promise when the data is valid', (done) => {
      const transaction = {
        email: 'test@gmail.com',
        password: 'abc123'
      };

      validate(transaction, schema)
      .then(value => {
        expect(value).toEqual(transaction);
        done();
      });
    });

    it('password should be not be valid if less than 6 characters', (done) => {
      validate({
        email: 'test@gmail.com',
        password: 'abc'
      }, schema)
      .catch(error => {
        expect(error.name).toEqual('ValidationError');
        done();
      });
    });

    it('should throw an error if the email format is not valid', (done) => {
      validate({
        email: 'testgmail.com',
        password: 'abc123'
      }, schema)
      .catch(error => {
        expect(error.name).toEqual('ValidationError');
        done();
      });
    });
  });

});
