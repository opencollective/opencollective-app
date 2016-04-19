/**
 * Environment variables
 */

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'development';
}

const env = {
  NODE_ENV: process.env.NODE_ENV
};

if (process.env.hasOwnProperty('APP_URL')) {
  env.API_ROOT = `${process.env.APP_URL}/api`;
} else if (env.NODE_ENV === 'circleci' || env.NODE_ENV === 'development') {
  env.API_ROOT = 'http://localhost:3000/api/';
}
console.log("env.API_ROOT set to", env.API_ROOT);

export default env;
