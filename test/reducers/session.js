import expect from 'expect';
import reducer from '../../reducers/session';
import {
  DECODE_JWT_SUCCESS,
} from '../../actions/session';

describe('session reducer', () => {

  it('should save the decoded user info', () => {
    const info = {id: 1};

    expect(reducer({}, {
      type: DECODE_JWT_SUCCESS,
      info
    }))
    .toEqual({user: info});
  });

});
