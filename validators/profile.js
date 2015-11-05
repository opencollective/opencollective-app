import Joi from 'joi';
import validate from '../lib/validate';

/**
 * Profile form schema
 */

const schema = Joi.object().keys({
  paypalEmail: Joi.string().email().required()
    .label('PayPal account'),
});

export default (obj) => validate(obj, schema);
