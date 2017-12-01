
var config = require('../config');

var mongodb = require('mongodb');
var mongoose = require('mongoose');

var dbConnection = { };
var database = null;

dbConnection.connect = function(app, callback) {
    
    mongoose.connect(config.DATABASE_URL, {
        useMongoClient: true
    });

    database = mongoose.connection;
    app.set('database', database);

    // when failed to connect to the database, 
    database.on('error', () => {
        // call callback function with error message
        callback('DATABASE CONNECTION ERROR');
    });

    // when success to connect to the database
    database.on('open', () => {
        // call callback function with null parameter
        callback(null);
    })
}

module.exports = dbConnection;
