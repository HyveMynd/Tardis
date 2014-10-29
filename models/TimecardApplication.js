/**
 * Created by Andres Monroy (HyveMynd) on 10/29/14.
 */

var assert = require('assert');

var TimecardApplication = function(args){
    var app = {};

    app.timeIn = args.timeIn;
    app.timeOut = args.timeOut;
    app.user = args.user;
    app.timecard = null;
    app.message = null;
    app.status = 'pending';

    app.invalidate = function (message) {
        app.status = 'invalid';
        app.message = message;
    };

    app.validate = function () {
        app.status = 'valid'
    };

    app.isValid = function () {
        return app.status === 'valid';
    };

    app.isInvalid = function () {
        return !app.isValid();
    };

    return app;
};

module.exports = TimecardApplication;