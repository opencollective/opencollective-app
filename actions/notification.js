import { NOTIFY } from '../constants/notification';

/**
 * Fetch one group
 */

export function notify(status, message) {
  return {
    type: NOTIFY,
    status,
    message
  };
}
