import expect from 'expect';
import reducer from '../../reducers/session';
import {
  DECODE_JWT_SUCCESS,
} from '../../constants/session';

describe('session reducer', () => {

  it('should save the decoded user info', () => {
    const user = {id: 1};

    expect(reducer({}, {
      type: DECODE_JWT_SUCCESS,
      user
    }))
    .toEqual({user});
  });

});
