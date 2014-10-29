/**
 * Created by Andres Monroy (HyveMynd) on 10/29/14.
 */

var ProjectApplication = function(args){
    var app = {};

    app.projectName = args.projectName;
    app.startDate = args.startDate;
    app.clientName = args.clientName;
    app.status = 'pending';
    app.message = null;
    app.project = null;

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

module.exports = ProjectApplication;