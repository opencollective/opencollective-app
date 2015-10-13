
/**
 * Constants
 */

export const RESET_TRANSACTION_FORM = 'RESET_TRANSACTION_FORM';
export const APPEND_TRANSACTION_FORM = 'APPEND_TRANSACTION_FORM';

/**
 * Reset transaction form
 */

export function resetTransactionForm() {
  return {
    type: RESET_TRANSACTION_FORM
  };
}

export function appendTransactionForm(attributes) {
  return {
    type: APPEND_TRANSACTION_FORM,
    attributes,
  };
}
