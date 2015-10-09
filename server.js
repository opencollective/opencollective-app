var express = require('express');
var path = require('path');
var app = express();

/**
 * React app
 */

app.use(express.static('public'));

/**
 * Serve the SPA
 */

app.all('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
