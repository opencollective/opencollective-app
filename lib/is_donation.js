import contains from 'lodash/collection/contains';

export default (transaction) => contains(transaction.tags, 'Donation');
