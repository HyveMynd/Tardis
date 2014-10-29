/**
 * Created by Andres Monroy (HyveMynd) on 10/28/14.
 */
var events = require('events');
var util = require('util');
var Timecard = require('../models/Timecard');
var TimecardApplication = require('../models/TimecardApplication');

var TimecardResult = function (){
    return {
        success: false,
        timecard: null,
        message: null
    }
};

var TimecardService = function(db) {
    var self = this;
    events.EventEmitter.call(self);
    var continueWith = null;

    var validateCreateInputs = function (app) {
        if (!app.user || app.user.email){
            self.emit('failed', 'User must have an email.')
        } else if (!app.timeIn || !app.timeOut) {
            self.emit('failed', 'Must have a time in and time out');
        } else {
            self.emit('validated', app);
        }
    };

    var checkIfUserExists = function (app) {
        db.record.get(app.user).then(function (user) {
            if (!user){
                self.emit('failed', 'User must exist');
            } else {
                self.emit('user-exists', app)
            }
        })
    };

    var checkIfTimeCardExists = function (app) {
        db.select().from('Timecard').where({timeIn: app.timeIn, belongsTo: app.user}).one().then(function (result) {
            if (result){
                self.emit('failed', 'Timecard already exists');
            } else {
                self.emit('timecard-does-not-exist', app);
            }
        });
    };

    var createTimecardInDb = function (app) {
        db.insert().into('Timecard').set({timeIn: app.timeIn, timeOut: app.timeOut, belongsTo: app.user['@rid']}).one().then(function (timecard) {
            app.timecard = new Timecard(timecard);
            self.emit('timecard-created-in-db', app);
        });
    };

    var createLog = function (app) {
        db.insert().into('Log').set({message: util.format('Timecard created. Timecard: %j', app)}).one().then(function (log) {
            self.emit('log-created', app);
        });
    };

    var timecardCreated = function (app) {
        var result = new TimecardResult();
        result.success = true;
        result.timecard = app.timecard;
        result.message = util.format('Timecard for %s %s created at %s.', app.user.firstname, app.user.lastname, new Date());
        self.emit('timecard-created', result);
        if (continueWith){
            continueWith(null, result);
        }
    };

    var timecardError = function (message) {
        var result = new TimecardResult();
        result.success = false;
        result.message = message;
        self.emit('timecard-error', result);
        if (continueWith){
            continueWith(null, result);
        }
    };

    self.registerTimecard = function (args, next) {
        var app = new TimecardApplication(args);
        continueWith = next;
        self.emit('creating-timecard', app);
    };

    // Creating Timecard
    self.on('creating-timecard', validateCreateInputs);
    self.on('validated', checkIfUserExists);
    self.on('user-exists', checkIfTimeCardExists);
    self.on('timecard-does-not-exist', createTimecardInDb);
    self.on('timecard-created-in-db', createLog);
    self.on('log-created', timecardCreated);


    // EDITING TIMECARD
    // validate inputs
    // check if timecard exists
    // edit timecard
    // create log

    // Error
    self.on('failed', timecardError);

    return self;
};

util.inherits(TimecardService, events.EventEmitter);
module.exports = TimecardService;