var express = require('express');
var bodyParser = require('body-parser');
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
  req.apiUrl = url(suffix);
  next();
});

/**
 * Authenticate is a separate route because it's the only one that needs the
 * api key. I haven't found a way to append data to body in a stream way.
 */

app.post('/api/authenticate', bodyParser.json(), function(req, res) {
  var body = _.extend({}, req.body, { api_key: config.apiKey });

  request({
    method: 'POST',
    url: req.apiUrl,
    json: true,
    body: body
  }).pipe(res);
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
  res.render('index', {
    stripePublicKey: config.stripePublicKey
  });
});

/**
 * Port config
 */

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
