import Joi from 'joi';

export default validate;

/**
 * Login form schema
 */

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

function validate(transaction) {
  const { error, value } = Joi.validate(transaction, schema);

  return error ? Promise.reject(error) : Promise.resolve(value);
}
