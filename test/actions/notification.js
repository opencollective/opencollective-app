import expect from 'expect';
import {
  NOTIFY,
  notify
} from '../../actions/notification';

describe('notification actions', () => {

  it('notifies with the status and message', () => {
    const message = 'Oops';
    const status = 'error';

    expect(notify(status, message)).toEqual({
      type: NOTIFY,
      message,
      status
    });
  });

});
