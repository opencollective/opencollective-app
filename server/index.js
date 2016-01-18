const fs = require('fs');
const express = require('express');
const serverStatus = require('express-server-status');
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
 * Server status
 */
app.use('/status', serverStatus(app));

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
 * /robots.txt 
 */
const robotstxt = fs.readFileSync(path.join(__dirname, '../static/robots.txt'), 'utf-8');
app.get('/robots.txt', (req, res) => res.send(robotstxt));

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

app.get(/^\/app(\/.*)?$/, (req, res) => {

  const meta = {
    url: 'https://opencollective.com',
    title: 'OpenCollective - create and fund your collective transparently',
    description: 'OpenCollective lets you crowdfund your association and manage its budget transparently',
    image: '/static/images/LogoLargeTransparent.png',
    twitter: '@OpenCollect',
  };
  const options = {
    showGA: false
  };
  return res.render('index', { meta, options });
});

/**
 * Server public page
 */

app.get('/:slug', (req, res) => {
  const options = {
    showGA: process.env.NODE_ENV === 'production'
  }
  request
    .get({
      url: apiUrl(`groups/${req.params.slug}/`),
      json: true
    }, (err, response, group) => {
      if (response.statusCode !== 200) {
        res.render('404', { options }); 
      } else {
        const meta = {
          url: group.publicUrl,
          title: 'Join ' + group.name + '\'s open collective',
          description: group.name + ' is collecting funds to continue their activities. Chip in!',
          image: group.image || group.logo,
          twitter: '@'+group.twitterHandle,
        }
        res.render('index', { meta, options });
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
