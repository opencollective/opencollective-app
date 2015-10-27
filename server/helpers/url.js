var config = require('config');

module.exports = function(url) {
  return config.apiUrl + url;
};
