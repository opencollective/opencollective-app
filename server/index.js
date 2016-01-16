const express = require('express');
const favicon = require('serve-favicon');
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
 * Favicon
 */
app.use(favicon(__dirname + '/../static/images/favicon.ico.png'));

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

  const meta = {
    url: 'https://opencollective.com',
    title: 'OpenCollective - create and fund your collective transparently',
    description: 'OpenCollective lets you crowdfund your association and manage its budget transparently',
    image: '/static/images/LogoLargeTransparent.png',
    twitter: '@OpenCollect',
  }
  res.render('index', { meta });
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
        res.render('404');
      } else {
        const meta = {
          url: group.publicUrl,
          title: group.name,
          description: group.description,
          image: group.logo,
          twitter: '@'+group.twitterHandle,
        }
        res.render('index', { meta });
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
