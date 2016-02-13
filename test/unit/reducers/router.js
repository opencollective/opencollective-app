import expect from 'expect';
import * as reducers from '../../../frontend/src/reducers/index';

describe('router reducer', () => {

  it('should return the router', () => {
    expect(reducers.router).toExist();
  });

});
