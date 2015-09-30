import { Schema, arrayOf } from 'normalizr';

/**
 * Schemas
 */

const GroupSchema = new Schema('groups');
const TransactionSchema = new Schema('transactions');

/**
 * Export all the schemas to normalize them later
 */

export default {
  GROUP: GroupSchema,
  GROUP_ARRAY: arrayOf(GroupSchema),
  TRANSACTION: TransactionSchema,
  TRANSACTION_ARRAY: arrayOf(TransactionSchema),
};
