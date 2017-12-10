
var mongoose = require('mongoose');

var user = { };

user.add = function(app, id, password, name, callback) {

    var database = app.get('database');

    // If cannot load the database, call callback function with error
    if (!database) {
        callback('Cannot load the database');
        return;
    }

    var user = database.userModel({
        'id': id,
        'password': password,
        'name': name
    });

    // Save the user. If cannot save, call callback function with error
    user.save((err) => {
        if (err) callback(err);
        else callback(null);
    });
}

user.delete = function(app, id, callback) {

    var database = app.get('database');

    // If cannot load the database, call callback function with error
    if (!database) {
        callback("Cannot load the database");
        return;
    }

    var userModel = database.userModel;
    userModel.remove({ id: id }, (err) => {
        if (err) callback(err);
        else callback(null);
    });
}

user.authenticate = function(app, id, password, callback) {

    var database = app.get('database');

    // if cannot load the database, call callback function with error
    if (!database) {
        callback('Cannot load the database', null);
        return;
    }

    database.UserModel.findById(id, (err, results) => {

        // if error occurs, return callback with error
        if (err) return callback(err, null);

        var user = new database.UserModel({id: id});
        var authenticated = user.authenticate(
            password,
            results[0]._doc.salt,
            results[0]._doc.hashed_password
        );

        if (authenticated) callback(null, results[0]);
        else callback(null, null);
    });
}

module.exports = user;