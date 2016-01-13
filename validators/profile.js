import Joi from 'joi';
import validate from '../lib/validate';

/**
 * Profile form schema
 */

const schema = Joi.alternatives().try(
    Joi.object().keys({
      paypalEmail: Joi.string().email().required()
        .label('PayPal account'),
      link: Joi.string().uri()
        .label('Photo'),
    }),
    Joi.object().keys({
      paypalEmail: Joi.string().email()
        .label('PayPal account'),
      link: Joi.string().uri().required()
        .label('Photo')
    }),
);

export default (obj) => validate(obj, schema);
