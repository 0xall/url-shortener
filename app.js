
var http = require('http');
var express = require('express');
var config = require('./config');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var app = express();

// use post, cookie, and session
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
}));

// load static directories
const static_directories = config.STATIC_FILES_DIRECTORIES;
for (var i = 0; i < static_directories.length; ++i) {
    app.use(express.static(static_directories[i]));
}

// load error handler
app.use(expressErrorHandler.httpError(404));
app.use(config.ERROR_HANDLER);

// export
module.exports = app;