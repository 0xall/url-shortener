
var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = { };

userSchema.load = function() {

    // define a schema for users
    var schema = mongoose.Schema({
        id: {type:String, required: true, unique: true, default: ''},
        hashed_password: {type:String, required: true, default: ''},
        salt: {type:String, required: true},
        name: {type:String, required: true, index: 'hashed', default: ''},
        created_at: {type:Date, index: {unique: false}, default:Date.now},
        updated_at: {type:Date, index: {unique: false}, default:Date.now},
    });

    // register a function for finding a user by id
    schema.static('findById', function(id, callback) {
        this.find({id: id}, callback);
    });

    // register a function for finding all users
    schema.static('findAll', function(callback) {
        this.find({ }, callback);
    });

    // register a function for encrypting password in the database
    schema.method('encryptPassword', function(password, inSalt) {
        if (inSalt) {
            return crypto.createHmac('sha1', inSalt).update(password).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        }
    });

    // register a function for making a salt for encrypting
    schema.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });

    // register a function for user authentication
    schema.method('authenticate', function(password, inSalt, hashed_password) {
        if (inSalt) {
            return this.encryptPassword(password, inSalt) === hashed_password;
        } else {
            return this.encryptPassword(password) === this.hashed_password;
        }
    });

    // register a virtual field for encrypting the password
    schema.virtual('password').set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    }).get(function() {
        return this._password;
    });

    return schema;
}

module.exports = userSchema;