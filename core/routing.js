
var path = require('path');

var routing = { };

routing.register = function(app, routersConfiguration) {

    for (var i = 0; i < routersConfiguration.length; ++i) {

        // get information for a router
        const routerInfo = routersConfiguration[i];
        const filePath = routerInfo.file;
        const url = routerInfo.url;

        // register to the app
        app.use(url, require(filePath));
    }
}

module.exports = routing;