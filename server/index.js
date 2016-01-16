const express = require('express');
const request = require('request');
const morgan = require('morgan');
const path = require('path');
const _ = require('lodash');
const config = require('config');

const apiUrl = url => {
  const withoutParams = config.apiUrl + (url.replace('/api/', ''));
  const hasParams = _.contains(url, '?');

  return withoutParams + (hasParams ? '&' : '?') + `api_key=${config.apiKey}`;
};

/**
 * Express app
 */

const app = express();

/**
 * Log
 */

app.use(morgan('dev'));

/**
 * Static folder
 */

app.use('/static', express.static(path.join(__dirname, '../static')));

/**
 * Pipe the requests before the middlewares, the piping will only work with raw
 * data
 * More infos: https://github.com/request/request/issues/1664#issuecomment-117721025
 */

app.all('/api/*', (req, res) => {
  req
    .pipe(request(apiUrl(req.url)))
    .pipe(res);
});

/**
 * Ejs template engine
 */

app.set('views', __dirname + '/views');
app.set('view cache', config.viewCache);
app.set('view engine', 'ejs');

/**
 * Serve the SPA
 */

app.get('/app/*', (req, res) => {
  res.render('index');
});

/**
 * Server public page
 */

app.get('/:slug', (req, res) => {
  request
    .get({
      url: apiUrl(`groups/${req.params.slug}/`),
      json: true
    }, (err, response, group) => {

      if (response.statusCode === 404) {
        res.render('404', {
          showGA: process.env.NODE_ENV === 'production'
        });
      } else {
        res.render('index', {
          group,
          showGA: process.env.NODE_ENV === 'production'
        });
      }
    });
});

/**
 * Port config
 */

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
