<<<<<<< HEAD:test/lib/get_unique_values.js
import {expect} from 'chai';
import getUniqueValues from '../../lib/get_unique_values';
=======
import expect from 'expect';
import getUniqueValues from '../../../lib/get_unique_values';
>>>>>>> refactor folder structure of tests and added circle ci e2e:test/unit/lib/get_unique_values.js

describe('getUniqueValues', () => {

  it('should return the values', () => {
    const data = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 }
    };

    expect(getUniqueValues(data, 'id')).to.deep.equal([1, 2, 3]);
  });

  // This test fails: it returns [ 1, undefined, 3 ]
  it('should remove unvalid values', () => {
    const data = {
      1: { id: 1 },
      2: { id: undefined },
      3: { id: 3 }
    };

    expect(getUniqueValues(data, 'id')).to.deep.equal([1, 3]);
  });

  it('should return the unique values', () => {
    const data = {
      1: { id: 1 },
      2: { id: 1 },
      3: { id: 3 }
    };

    expect(getUniqueValues(data, 'id')).to.deep.equal([1, 3]);
  });

});
