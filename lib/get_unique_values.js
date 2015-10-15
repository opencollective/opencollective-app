import _ from 'lodash';

/**
 * Takes a normalized collection and returns the unique values of a key
 */

export default (collection, key) => {
  return _.chain(collection)
    .values()
    .pluck(key)
    .uniq()
    .compact()
    .value();
};
