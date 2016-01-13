import expect from 'expect';
import validate from '../../validators/donation_profile';

describe('validator profile after public donation', () => {
  // Check for data validity

  it('should throw an error if the website format is not valid', (done) => {
    validate({
      website: 'opencollective',
    })
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });

  // Check if only one is entered.

  it('should work if only the name is in payload', (done) => {
    const profile = {
      name: 'my name',
    };
    validate(profile)
    .then(value => {
      expect(value).toEqual(profile);
      done();
    });
  });

  it('should work if only the twitterHandle is in payload', (done) => {
    const profile = {
      twitterHandle: 'asood123',
    }
    validate(profile)
    .then(value => {
      expect(value).toEqual(profile);
      done();
    });
  });

  it('should throw an error if only website is in payload', (done) => {
    validate({
      website: 'http://www.opencollective.com',
    })
    .catch(error => {
      expect(error.name).toEqual('ValidationError');
      done();
    });
  });

  // check if all are entered.
  it('should work if all three are there', (done) => {
    const profile = {
      name: 'my name',
      website: 'http://www.opencollective.com',
      twitterHandle: 'asood123'
    };
    validate(profile)
    .then(value => {
      expect(value).toEqual(profile);
      done();
    });
  });
});
