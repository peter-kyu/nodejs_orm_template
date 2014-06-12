/**
 * Module dependencies.
 */

var express = require('express'),
    connect = require('connect'),
    http    = require('http'),
    https   = require('https'),
    fs      = require('fs'),
    path    = require('path'),
    config  = require('config'),
    db      = require('./models');
//var mysql = require('mysql');
var app     = express();

// all environments
app.set('port', config.http.port || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('views options', { layout: false });
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');
app.use(connect.favicon());
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());
app.use(connect.methodOverride());
app.use(connect.static(path.join(__dirname, 'views')));
app.use(connect.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(connect.errorHandler());
}

// for mapping controller
require('./routing')(app);

db
    .sequelize
    .sync({ force: false})
    .complete(function(err) {
        if (err) {
            throw err[0];
        } else {
            if (config.https.use) {
                var credential = {
                    key: fs.readFileSync(path.join(__dirname, 'public/https/key.pem')),
                    cert: fs.readFileSync(path.join(__dirname, 'public/https/key-cert.pem'))
                };

                https.createServer(credential, app)
                    .listen(app.get('port'), function () {
                        console.log('Express server listening on port ' + app.get('port') + ' with https');
                    });
            } else {
                http
                    .createServer(app)
                    .listen(app.get('port'), function () {
                        console.log('Express server listening on port ' + app.get('port'));
                    }
                );
            }
        }
    });

// for video chat
var webRTC = require('webrtc.io').listen(app);
console.log('video chat server linstening on port ' + app.get('port'));


