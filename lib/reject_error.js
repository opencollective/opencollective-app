import isString from 'lodash/lang/isString';
import isObject from 'lodash/lang/isObject';

/**
 * Promisifies errors returned by reducers
 *
 * You can either pass the args in the following form
 * {message: 'error message'}
 *
 * @example
 * createTransaction(transaction).then(rejectError)
 *
 * Or you can pass a string that will check `this.props`.
 * it will first check if the args is an error with a message
 *
 * @example
 * createTransaction(transaction)
 * .then(rejectError.bind(this, 'ValidationError'))
 */
export default function(args) {
  if (isError(args)) {
    return Promise.reject(args);
  } else if (isString(args)) {
    const customError = isObject(this.props) ? this.props[args] : {};

    if (isError(customError)) {
      return Promise.reject(customError);
    }
  }

  return Promise.resolve();
};

/**
 * Reducer error format
 */

function isError(error) {
  return isObject(error) && isString(error.message);
}
