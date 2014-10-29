/**
 * Created by Andres Monroy (HyveMynd) on 10/28/14.
 */
var events = require('events');
var util = require('util');
var Application = require('../models/Application');
var User = require('../models/User');

var RegResult = function () {
    return {
        success: false,
        message: null,
        user: null
    }
};

var Registration = function(db) {
    var self = this;
    events.EventEmitter.call(self);
    var continueWith = null;

    var validateInputs = function (app) {
        if (!app.email){
            app.invalidate("Must have an email");
            self.emit("invalidated", app);
        }
        else if (!app.firstname || !app.lastname){
            app.invalidate("Must have a first name and last name");
            self.emit("invalidated", app);
        }
        else if (app.rate <= 0){
            app.invalidate("Rate must be a positive number");
            self.emit("invalidated", app);
        } else {
            app.validate();
            self.emit("validated", app);
        }
    };

    var checkIfUserExists = function (app) {
        db.select().from('User').where({email: app.email}).one().then(function (user) {
            if (user){
                app.invalidate('This email already exists.');
                self.emit("invalidated", app);
            } else {
                self.emit('user-does-not-exist', app);
            }
        });
    };

    var createUserInDb = function (app) {
        db.insert().into('User').set({email: app.email, firstname: app.firstname, lastname: app.lastname, rate: app.rate}).one().then(function (user) {
            if (user){
                app.user = new User(user);
                self.emit('user-created-in-db', app);
            } else {
                app.invalidate('Could not create user.');
                self.emit('invalidated', app);
            }
        });
    };

    var createLog = function (app) {
        db.insert().into('Log').set({message: util.format('Created user. App: %j', app), timestamp: new Date()}).one().then(function (log) {
            self.emit('log-created', app);
        });
    };

    var registrationSuccess = function (app) {
        var regResult = new RegResult();
        regResult.success = true;
        regResult.message = "Welcome";
        regResult.user = app.user;
        self.emit('registered', app);
        if (continueWith){
            continueWith(null, regResult);
        }
    };

    var registrationFailed = function (app) {
        var regResult = new RegResult();
        regResult.success = false;
        regResult.message = app.message;
        self.emit('not-registered', app);
        if (continueWith){
            continueWith(null, regResult);
        }
    };

    self.registerUser = function (args, next) {
        var app = new Application(args);
        continueWith = next;
        self.emit('registration-started', app);
    };

    // Normal Path
    self.on('registration-started', validateInputs);
    self.on('validated', checkIfUserExists);
    self.on('user-does-not-exist', createUserInDb);
    self.on('user-created-in-db', createLog);
    self.on('log-created', registrationSuccess);

    // Error path
    self.on('invalidated', registrationFailed);

    return self;
};

util.inherits(Registration, events.EventEmitter);
module.exports = Registration;