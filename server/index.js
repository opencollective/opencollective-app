var express = require('express');
var request = require('request');
var _ = require('lodash');
var config = require('config');

var url = require('./helpers/url');

/**
 * Express app
 */

var app = express();

/**
 * Create real api url
 */

app.use(function(req, res, next) {
  var suffix = req.url.replace('/api/', '');
  // This is a hack to append api_key.
  // TODO: find a better way to do this
  if (_.contains(suffix, '?')) {
    req.apiUrl = url(suffix) + '&api_key=' + config.apiKey;
  } else {
    req.apiUrl = url(suffix) + '?api_key=' + config.apiKey;
  }
  next();
});

/**
 * Pipe the requests before the middlewares, the piping will only work with raw
 * data
 * More infos: https://github.com/request/request/issues/1664#issuecomment-117721025
 */

app.all('/api/*', function(req, res) {
  req.pipe(request(req.apiUrl)).pipe(res);
});

/**
 * Static folder
 */

app.use(express.static('public'));

/**
 * Ejs template engine
 */

app.set('views', __dirname + '/views');
app.set('view cache', config.viewCache);
app.set('view engine', 'ejs');

/**
 * Serve the SPA
 */

app.all('*', function(req, res) {
  res.render('index', {});
});

/**
 * Port config
 */

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
