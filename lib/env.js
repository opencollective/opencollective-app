/**
 * Environment variables
 */

const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: '0ac43519edcf4421d80342403fb5985d',
};

env.API_ROOT = process.env.NODE_ENV === 'production' ?
  'https://opencollective.herokuapp.com/' :
  'http://localhost:3060/';

export default env;
