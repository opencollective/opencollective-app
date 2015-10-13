/**
 * Constants
 */

export const NOTIFY = 'NOTIFY';

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
