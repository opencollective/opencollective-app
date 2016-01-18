import expect from 'expect';
import validate from '../../validators/profile';

describe('validator profile', () => {
  it('should resolve the promise when the data is valid', (done) => {
    const profile = {
      paypalEmail: 'test@gmail.com',
      link: 'http://opencollective.com/static/images/icon.svg',
    };

    validate(profile)
    .then(value => {
      expect(value).toEqual(profile);
      done();
    });
  });

  // Check for data validity

  it('should reject the promise when paypalEmail is not valid', (done) => {
    validate({
      paypalEmail: 'ben'
    })
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
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

  it('should throw an error if the url format is not valid', (done) => {
    validate({
      link: 'opencollective',
    })
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });

  // Check if only one is entered, it should still work.

  it('should work if only the link is in payload and no paypalEmail', (done) => {
    const profile = {
      link: 'http://opencollective.com/static/images/icon.svg',
    };
    validate(profile)
    .then(value => {
      expect(value).toEqual(profile);
      done();
    });
  });

  it('should work if only the paypalEmail is in payload and no link', (done) => {
    const profile = {
      paypalEmail: 'test@gmail.com',
    }
    validate(profile)
    .then(value => {
      expect(value).toEqual(profile);
      done();
    });
  });

  it('should throw an error if neither is sent', (done) => {
    validate({})
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });
});

