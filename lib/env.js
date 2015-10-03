/**
 * Environment variables
 */

const env = {
  NODE_ENV: process.env.NODE_ENV,
};

env.API_ROOT = env.NODE_ENV === 'production' ?
  'https://opencollective.herokuapp.com/' :
  'http://localhost:3060/';

env.API_KEY = env.NODE_ENV === 'production' ?
  '637526ace0abe5ebc034e744d86d603a' :
  '0ac43519edcf4421d80342403fb5985d';

export default env;
