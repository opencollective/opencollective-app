import expect from 'expect';
import errorDetail from '../../../lib/error_detail';

describe('errorDetail', () => {

  it('should return the detail', () => {
    const error = {
      details: [{
        message: 'Title is not allowed to be empty',
        path: 'description',
        type: 'any.empty'
      }]
    };

    expect(errorDetail({error}), error.details[0]);
  });

  it('should return an empty object if unvalid', () => {
    const error = {
      details: []
    };

    expect(errorDetail({error}), {});
  });

});
