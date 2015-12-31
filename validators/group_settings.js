import Joi from 'joi';
import validate from '../lib/validate';

/**
 * Profile form schema
 */

const schema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string().max(95),
});

export default (obj) => validate(obj, schema);
