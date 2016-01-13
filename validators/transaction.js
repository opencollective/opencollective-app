import Joi from 'joi';
import pluck from 'lodash/collection/pluck';

import dates from '../lib/dates';
import validate from '../lib/validate';
import paymentMethods from '../ui/payment_methods';

/**
 * New transaction schema
 */

const schema = Joi.object().keys({
  link: Joi.string().uri()
    .label('Photo'),
  description: Joi.string().required()
    .label('Title'),
  amount: Joi.number().precision(2).min(0).required()
    .label('Amount'),
  vat: Joi.number().precision(2).min(0).allow(null)
    .label('VAT'),
  createdAt: Joi.date().max(dates().tomorrow).required()
    .raw() // doesn't convert date into Date object
    .label('Date'),
  approvedAt: Joi.date().max(dates().tomorrow)
    .raw() // doesn't convert date into Date object
    .label('Date'),
  tags: Joi.array().items(Joi.string()).required()
    .label('Category'),
  approved: Joi.boolean(),
  paymentMethod: Joi.string().valid(pluck(paymentMethods, 'value'))
    .label('Payment method'),
  comment: Joi.string()
    .label('Comment'),
});

export default (obj) => validate(obj, schema);
