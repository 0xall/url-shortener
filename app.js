
var express = require('express');
var config = require('./config');

var dbConnection = require('./core/db-connection');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var msg = require('./core/message');

var app = express();

// connect to the database
dbConnection.connect(app, (err) => {

    const message = 'Database connection (' + config.DATABASE_URL + ')';

    if (err) {
        msg.success(message);
        msg.fail(message);
        process.exit(127);
    }

    msg.success(message);
});

// use ejs view
app.set('views', config.VIEW_FILES_DIRECTORY);
app.set('view engine', 'ejs');

// use post, cookie, and session
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
}));

// load static directories
const staticDirectories = config.STATIC_FILES_DIRECTORIES;
for (var i = 0; i < staticDirectories.length; ++i) {
    app.use(express.static(staticDirectories[i]));
}

// load error handler
app.use(expressErrorHandler.httpError(404));
app.use(config.ERROR_HANDLER);

// export
module.exports = app;