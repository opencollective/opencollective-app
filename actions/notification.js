import { NOTIFY, RESET_NOTIFICATIONS } from '../constants/notification';

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

/**
 * Reset notifications, will be called on each page change
 */

export function resetNotifications() {
  return {
    type: RESET_NOTIFICATIONS
  };
}
