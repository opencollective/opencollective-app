import Joi from 'joi';
import dates from '../lib/dates';
import validate from '../lib/validate';

/**
 * New fund schema
 */

const schema = Joi.object().keys({
  description: Joi.string().required()
    .label('Description'),
  amount: Joi.number().precision(2).required()
    .label('Amount'),
  // TODO remove, shouldn't be necessary for funds
  approvedAt: Joi.date().max(dates().tomorrow)
    .raw() // doesn't convert date into Date object
    .label('Date')
    .allow(null),
  approved: Joi.boolean(),
  createdAt: Joi.date().max(dates().tomorrow).required()
    .raw() // doesn't convert date into Date object
    .label('CreatedAt'),
  tags: Joi.array().items(Joi.string()).required()
    .label('Category')
});

export default (obj) => validate(obj, schema);
