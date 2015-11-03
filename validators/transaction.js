import Joi from 'joi';
import dates from '../lib/dates';

export default validate;

/**
 * New transaction schema
 */

const schema = Joi.object().keys({
  link: Joi.string().uri()
    .label('Photo'),
  description: Joi.string().required()
    .label('Title'),
  amount: Joi.number().precision(2).greater(0).required()
    .label('Amount'),
  createdAt: Joi.date().max(dates().tomorrow).required()
    .label('Date'),
  tags: Joi.array().items(Joi.string()).required()
    .label('Type'),
});

function validate(transaction) {
  const { error, value } = Joi.validate(transaction, schema);

  return error ? Promise.reject(error) : Promise.resolve(value);
}
