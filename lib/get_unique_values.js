import values from 'lodash/object/values';
import pluck from 'lodash/collection/pluck';
import uniq from 'lodash/array/uniq';
import compact from 'lodash/array/uniq';

/**
 * Takes a normalized collection and returns the unique values of a key
 */

export default (collection, key) => {
  let values = pluck(values(collection), key);

  return compact(uniq(values));
};
