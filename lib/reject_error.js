import isString from 'lodash/lang/isString';
import isObject from 'lodash/lang/isObject';

/**
 * Promisifies errors returned by reducers
 *
 * You can either pass the args in the following form
 * {error: {message: 'error message'}}
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
  console.log('args', args, this.props);
  if (args && args.error && isError(args.error)) {
    console.log('first shit', args.error);
    return Promise.reject(args.error);
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
