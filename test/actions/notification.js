import expect from 'expect';
import notify from '../../src/actions/notification/notify';
import { NOTIFY } from '../../src/constants/notification';

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
