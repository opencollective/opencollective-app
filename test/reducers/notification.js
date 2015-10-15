import expect from 'expect';
import reducer from '../../reducers/notification';
import {
  NOTIFY,
} from '../../actions/notification';


describe('notification reducer', () => {

  it('should save the notification', () => {
    const notification = {
      message: 'Yo',
      status: 'error'
    };

    expect(reducer({}, {
      ...notification,
      type: NOTIFY
    }))
    .toEqual(notification);
  });

});
