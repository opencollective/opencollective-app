var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('lodash');
var config = require('config');

var url = require('./helpers/url');

var app = express();

/**
 * Express app
 */

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view cache', config.viewCache);
app.set('view engine', 'ejs');

/**
 * Pipe the api to hide the env variables
 * Authenticate is a separate route because it's the only one that needs the
 * api key
 */

app.post('/api/authenticate', function(req, res) {
  var body = _.extend({}, req.body, { api_key: config.apiKey });

  request({
    method: 'POST',
    url: url('authenticate'),
    json: true,
    body: body
  }).pipe(res);
});

app.all('/api/*', function(req, res) {
  var suffix = req.url.replace('/api/', '');

  req.pipe(request(url(suffix))).pipe(res);
});

/**
 * Serve the SPA
 */

app.all('*', function(req, res) {
  var locals = {
    apiUrl: config.clientUrl + 'api/', // Proxy api route
    clientUrl: config.clientUrl
  };

  res.render('index', locals);
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
