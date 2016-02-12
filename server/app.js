import express from 'express';
import serverStatus from 'express-server-status';
import favicon from 'serve-favicon';
import request from 'request';
import morgan from 'morgan';
import path from 'path';
import _ from 'lodash';
import robots from 'robots.txt';
import config from 'config';

import apiUrl from './utils/api_url';
import busted from './locals/busted';

/**
 * Express app
 */
const app = express();

/**
 * Locals for the templates
 */
app.locals.busted = busted;

/**
 * Server status
 */
app.use('/status', serverStatus(app));

/**
 * Favicon
 */
app.use(favicon(path.join(__dirname, '/../static/images/favicon.ico.png')));

/**
 * Log
 */
app.use(morgan('dev'));

/**
 * Static folder
 */
app.use('/static', express.static(path.join(__dirname, '../static')));

/**
 * GET /robots.txt
 */
app.use(robots(path.join(__dirname, '../static/robots.txt')));

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
app.set('views', path.join(__dirname, '/views'));
app.set('view cache', config.viewCache);
app.set('view engine', 'ejs');

/**
 * Serve the SPA
 */

app.get(/^(\/.*)?$/, (req, res) => {

  const meta = {
    url: 'https://opencollective.com',
    title: 'OpenCollective - create and fund your collective transparently',
    description: 'OpenCollective lets you crowdfund your association and manage its budget transparently',
    image: '/static/images/LogoLargeTransparent.png',
    twitter: '@OpenCollect',
  };
  const options = { showGA: false };

  return res.render('index', { meta, options });
});

/**
 * 404 route
 */

app.use((req, res, next) => {
  return next({
    code: 404,
    message: 'We can\'t find that page.'
  });
});

/**
 * Error handling
 */

app.use((err, req, res, next) => {

  console.log('Error', err);
  console.log('Error stack', err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.render('error', {
    message: `Error ${err.code}: ${err.message}`,
    options: {
      showGA: process.env.NODE_ENV === 'production'
    }
  });
});

/**
 * Port config
 */

app.set('port', process.env.PORT || 3000);

if (!_.contains(['test', 'circleci'], app.set('env'))) {
  /**
   * Start server
   */
  app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
  });

}

module.exports = app;
