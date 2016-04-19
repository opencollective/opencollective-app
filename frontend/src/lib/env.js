/**
 * Environment variables
 */

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'development';
}

const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_ROOT: '/api/'
};

if (env.NODE_ENV === 'circleci' || env.NODE_ENV === 'development') {
  env.API_ROOT = 'http://localhost:3030/api/';
}

export default env;