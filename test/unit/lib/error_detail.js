<<<<<<< HEAD:test/lib/error_detail.js
import {expect} from 'chai';
import errorDetail from '../../lib/error_detail';
=======
import expect from 'expect';
import errorDetail from '../../../lib/error_detail';
>>>>>>> refactor folder structure of tests and added circle ci e2e:test/unit/lib/error_detail.js

describe('errorDetail', () => {

  it('should return the detail', () => {
    const error = {
      name: 'ValidationError',
      details: [{
        message: 'Title is not allowed to be empty',
        path: 'description',
        type: 'any.empty'
      }]
    };

    expect(errorDetail({error})).to.equal(error.details[0]);
  });

  it('should return an empty object if unvalid', () => {
    const error = {
      details: []
    };

    expect(errorDetail({error})).to.deep.equal({});
  });

});
