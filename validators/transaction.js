import Joi from 'joi';
import dates from '../lib/dates';
import validate from '../lib/validate';

/**
 * New transaction schema
 */

const schema = Joi.object().keys({
  link: Joi.string().uri()
    .label('Photo'),
  description: Joi.string().required()
    .label('Title'),
  amount: Joi.number().precision(2).required()
    .label('Amount'),
  createdAt: Joi.date().max(dates().tomorrow).required()
    .raw() // doesn't convert date into Date object
    .label('Date'),
  tags: Joi.array().items(Joi.string()).required()
    .label('Type'),
});

export default (obj) => validate(obj, schema);
