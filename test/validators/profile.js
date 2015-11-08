import expect from 'expect';
import validate from '../../src/validators/profile';

describe('validator profile', () => {
  it('should reject the promise when the data is not valid', (done) => {
    validate({
      paypalEmail: 'ben'
    })
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });

  it('should resolve the promise when the data is valid', (done) => {
    const profile = {
      paypalEmail: 'test@gmail.com'
    };

    validate(profile)
    .then(value => {
      expect(value).toEqual(profile);
      done();
    });
  });

  it('should throw an error if the paypalEmail format is not valid', (done) => {
    validate({
      paypalEmail: 'testgmail.com',
    })
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });
});
