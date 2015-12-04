import { NOTIFY } from '../../constants/notification';

/**
 * Send notification
 */

export default (status, message) => {
  console.log('notify', status, message);
  return {
    type: NOTIFY,
    status,
    message
  };
};
