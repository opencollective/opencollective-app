import Joi from 'joi';
import validate from '../lib/validate';

/**
 * Profile form schema
 */

const schema = Joi.object().keys({
  paypalEmail: Joi.string().email().required()
    .label('PayPal account'),
  link: Joi.string().uri()
    .label('Photo'),
});

export default (obj) => validate(obj, schema);
