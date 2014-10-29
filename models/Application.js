/**
 * Created by Andres Monroy (HyveMynd) on 10/28/14.
 */

var assert = require('assert');

var Application = function(args){
    var app = {};
    assert.ok(args.firstname && args.lastname && args.rate && args.email,
        "First name, last name, rate and email must be defined");

    app.firstname = args.firstname;
    app.lastname = args.lastname;
    app.email = args.email;
    app.rate = args.rate;
    app.status = "pending";
    app.message = null;
    app.user = null;

    app.isValid = function () {
        return app.status === "valid";
    };

    app.isInvalid = function () {
        return !app.isValid();
    };

    app.validate = function () {
        app.status = "valid";
    };

    app.invalidate = function (message) {
        app.message = message;
        app.status = "invalid";
    };

    return app;
};

module.exports = Application;