var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var index = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/users');

/* https 세팅 */
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./sslTest/key.pem'),
  cert: fs.readFileSync('./sslTest/cert.pem')
};

var PORT1 = 3000;
var PORT2 = 443;


var app = express();

// app.set('port', (process.env.PORT || PORT1));




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/', index);
app.use('/api/', api);
app.use('/users', users);

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

http.createServer( app ).listen( PORT1, function() {
  console.log("Http Server listening on port " + PORT1);
});

https.createServer( options, app ).listen( PORT2, function() {
  console.log("Https server listening on port " + PORT2);
});

