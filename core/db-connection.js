
var config = require('../config');

var path = require('path');
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
    });
}

dbConnection.loadSchemas = function(schemas) {
    
    for (var i = 0; i < schemas.length; ++i) {
        const currentSchema = schemas[i];
        var fileName = currentSchema.file;
        var collectionName = currentSchema.collection;
        
        // load a schema and a model from information
        var schema = require(path.join('..', fileName)).load();
        var model = mongoose.model(collectionName, schema);
    
        // register the schema and the model to the database variable
        database[currentSchema.schemaName] = schema;
        database[currentSchema.modelName] = model;
    }
}

module.exports = dbConnection;
