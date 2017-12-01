
var path = require('path');
var expressErrorHandler = require('express-error-handler');

var config = {};

// the web server port
config.PORT = 8000;

// static files directories
config.STATIC_FILES_DIRECTORIES = [
    path.join(__dirname, 'static'),
];

// view files directory
config.VIEW_FILES_DIRECTORY = path.join(__dirname, 'views');

// error handler
config.ERROR_HANDLER = expressErrorHandler({
    static: {
        '404': path.join(__dirname, 'static', '404.html')
    }
});

module.exports = config;