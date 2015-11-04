import Joi from 'joi';

export default validate;

/**
 * Login form schema
 */

const schema = Joi.object().keys({
  paypalEmail: Joi.string().email().required()
    .label('Email'),
});

function validate(transaction) {
  const { error, value } = Joi.validate(transaction, schema);

  return error ? Promise.reject(error) : Promise.resolve(value);
}
